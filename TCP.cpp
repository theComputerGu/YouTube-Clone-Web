#include <iostream>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <thread>
#include <unordered_map>
#include <vector>
#include <algorithm>
#include <string>
#include <sstream>
#include <unordered_set>


// Mock database for video recommendations
std::unordered_map<std::string, std::vector<std::string>> video_watchers;  // video_id -> list of users
std::unordered_map<std::string, int> video_popularity;  // video_id -> view count
std::unordered_map<std::string, std::vector<std::string>> user_watch_history;  // user_id -> list of video_ids

// Function to update watch history
void update_watch_history(const std::string& user_id, const std::string& video_id) {
    user_watch_history[user_id].push_back(video_id);
    video_watchers[video_id].push_back(user_id);
    video_popularity[video_id]++;
}

// Function to get recommendations based on user watch history
std::vector<std::string> get_recommendations(const std::string& user_id) {
    std::vector<std::string> recommendations;
    std::unordered_map<std::string, int> candidate_videos;

    // Get videos watched by the current user
    const std::vector<std::string>& watched_videos = user_watch_history[user_id];
    std::unordered_set<std::string> watched_set(watched_videos.begin(), watched_videos.end());

    // Collect videos watched by users who watched the same videos as the current user
    for (const std::string& video_id : watched_videos) {
        for (const std::string& other_user : video_watchers[video_id]) {
            if (other_user == user_id) continue; // Skip the current user
            for (const std::string& other_video : user_watch_history[other_user]) {
                if (watched_set.find(other_video) == watched_set.end()) {
                    candidate_videos[other_video]++;
                }
            }
        }
    }

    // Sort candidate videos by popularity
    std::vector<std::pair<std::string, int>> sorted_candidates(candidate_videos.begin(), candidate_videos.end());
    std::sort(sorted_candidates.begin(), sorted_candidates.end(),
              [](const auto& a, const auto& b) { return b.second > a.second; });

    // Prepare response with top 6-10 recommendations
    int count = 0;
    for (const auto& [vid, _] : sorted_candidates) {
        if (++count > 10) break;
        recommendations.push_back(vid);
    }

    return recommendations;
}

// Function to handle communication with a client
void handle_client(int client_sock) {
    char buffer[4096];

    while (true) {
        int read_bytes = recv(client_sock, buffer, sizeof(buffer), 0);
        if (read_bytes <= 0) {
            break; // Connection closed by client or an error occurred
        }

        buffer[read_bytes] = '\0'; // Null-terminate the received data
        std::cout << "Received: " << buffer << std::endl;

        // Parse the message
        std::string message(buffer);
        std::string user_id;
        std::string command;
        std::string video_id;

        std::istringstream iss(message);
        iss >> command >> user_id;

        if (command == "user") {
            // Update watch history
            iss >> command >> video_id; // Expecting "watched" command
            if (command == "watched") {
                update_watch_history(user_id, video_id);

                std::cout << "Watch event logged for User " << user_id << " and Video " << video_id << std::endl;

                std::string response = "Watch event logged for User " + user_id + " and Video " + video_id;
                send(client_sock, response.c_str(), response.size(), 0);
            }
        } else if (command == "recommend") {
            // Get recommendations
            std::vector<std::string> recommendations = get_recommendations(user_id);

            // Prepare response: top 6-10 videos
            std::string response = "Recommended videos: ";
            for (const std::string& vid : recommendations) {
                response += vid + " ";
               std::cout << "is is " << vid << std::endl;


            }
            send(client_sock, response.c_str(), response.size(), 0);
        } else {
            std::string response = "Unknown command";
            send(client_sock, response.c_str(), response.size(), 0);
        }
    }

    close(client_sock); // Close the client socket when done
}

// Main function to set up and run the server
int main() {
    const int server_port = 5551; // Port number for the server

    // Create a TCP socket
    int server_sock = socket(AF_INET, SOCK_STREAM, 0);
    if (server_sock == -1) {
        std::cerr << "Error creating socket." << std::endl;
        return 1;
    }

    // Define the server address and port
    sockaddr_in server_addr;
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = INADDR_ANY; // Accept connections from any IP address
    server_addr.sin_port = htons(server_port); // Set the port number

    // Bind the socket to the specified address and port
    if (bind(server_sock, (sockaddr*)&server_addr, sizeof(server_addr)) == -1) {
        std::cerr << "Error binding socket." << std::endl;
        close(server_sock);
        return 1;
    }

    // Start listening for incoming connections
    if (listen(server_sock, SOMAXCONN) == -1) {
        std::cerr << "Error listening on socket." << std::endl;
        close(server_sock);
        return 1;
    }

    std::cout << "Server is listening on port " << server_port << std::endl;

    // Main loop to accept and handle client connections
    while (true) {
        int client_sock = accept(server_sock, nullptr, nullptr); // Accept a new client connection
        if (client_sock == -1) {
            std::cerr << "Error accepting client." << std::endl;
            continue; // Continue to the next iteration to accept another client
        }

        // Create a new thread to handle the client
        std::thread(handle_client, client_sock).detach();
    }

    close(server_sock); // Close the server socket (this line will never be reached)
   return 0;
}
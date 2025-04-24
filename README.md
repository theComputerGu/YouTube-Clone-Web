
 
 ### How to run the Web application::
 Download the Server-part4 folder and open it in Visual Studio Code (VSCode).
 
 this folder contains the server code for the Web application, which is also adjusted to work with the TCP server.
 
 
 navigate to the "Server-part4" folder
 create "config" folder
 create a file named ".env.local" under the config folder and fill it with:
 
 ```
 CONNECTION_STRING="mongodb://localhost:27017"
 PORT=12345
 ```
 
 open MongoDBCompass and connect to "mongodb://localhost:27017"
 under the "test" DB imoprt the json files from the 'dataForServer' folder import users.json to users and videos.json to videos.
 
 after downloading the server you need to run this code: "npm i" then "npm start" - and it needs to look like this:
 
 ![alt text](<Screenshot 2024-10-08 210317.png>)
 
 
 now you can open your browser on http://localhost:12345/ and see the website
 
 
 Now, download the TCP.cpp file and put it in WSL (Windows Subsystem for Linux) in VSCode. Compile it using the following command:
 
 ```sh
 g++ -std=c++17 -o tcp TCP.cpp
 ```
 Then, run the TCP server using this command:
 
 ```sh
 ./tcp
 ```
 
 like this:
 
 ![alt text](<Screenshot 2024-10-08 205933.png>)
 
 
 
 
 
 
 
 
 # Web App Demonstration
 ### **The images below may appear large, affecting their layout. For the best experience, simply click on any image to view it in full size. This will open the image in its actual resolution and provide a clearer view of the content.**
 
 
 ## Home Page
 The Home Page offers a variety of useful features, including:
 
 * A video list displaying all available videos on the platform.
 * A search bar to filter videos by title.
 * Options to sign in, edit videos, toggle dark mode, and refresh the page by returning to the Home Page.
 
 # Home Page Views
 
 
 | <img src="Screenshot 2024-10-10 215740.png" width="auto" height="400"/> | <img src="Screenshot 2024-10-10 215815.png" width="auto" height="400"/> | <img src="Screenshot 2024-10-10 215838.png" width="auto" height="400"/> |
 |:------------------------------------------------------------:|:------------------------------------------------------------:|:------------------------------------------------------------:|
 | Home page standard | Dark mode | Search |
 
 
 
 
 
 
 
 ## Watch Video
 The Watch Video page provides several useful features, including:
 
 * A video list displaying all available videos on the platform.
 
 * The ability to watch videos, pause, skip forward, and rewind.
 
 * Options to add, edit, and delete comments.
 * The ability to like or dislike videos.
 * A view counter showing how many people have watched the video.
 
 
 # Watch VideoViews
 
 
 | <img src="Screenshot 2024-10-10 215901.png" width="auto" height="400"/> | <img src="Screenshot 2024-10-10 215941.png" width="auto" height="400"/> | <img src="Screenshot 2024-10-10 220310.png" width="auto" height="400"/> | <img src="Screenshot 2024-10-10 220322.png" width="auto" height="400"/> |
 |:------------------------------------------------------------:|:------------------------------------------------------------:|:------------------------------------------------------------:|:------------------------------------------------------------:|
 | Regular | Dark mode | Add comment | Erase comment |
 
 
 
 
 ## Sign In Page
 The Sign Page allows you to log in to an existing one with the following validations:
 
 
 * If the username is incorrect or does not exist, an alert will notify you that the user was not found.
 * If the password is incorrect, an alert will notify you to check your password and try again.
 * These validations ensure that account creation and login processes are secure and user-friendly.
 
 
 
 # Sign In Views
 
 
 | <img src="Screenshot 2024-10-10 220350.png" width="auto" height="400"/> | <img src="Screenshot 2024-10-10 220411.png" width="auto" height="400"/> | <img src="Screenshot 2024-10-10 220425.png" width="auto" height="400"/> |
 |:------------------------------------------------------------:|:------------------------------------------------------------:|:------------------------------------------------------------:|
 | Regular | Sign in | You can see the user's photo after signing in |
 
 
 
 
 
 
 
 
 ## Sign UP Page
 The Sign Up Page allows users to create a new account with the following features:
 
 * Username Availability: If the username is already taken, an alert will notify the user to choose a different name.
 * Password Strength: If the password is too weak, an alert will suggest creating a stronger password (e.g., using a mix of letters, numbers, and special characters).
 * Password Confirmation: If the password does not match the confirmation field, an alert will notify the user to re-enter the passwords.
 * User-Friendly Design: The interface is intuitive, making the sign-up process smooth and efficient, with clear guidance at each step.
 * User Photo: Users can upload a profile picture during sign-up, making the experience more personalized.
 
 
 
 # Sign Up Views
 
 
 | <img src="Screenshot 2024-10-10 220450.png" width="auto" height="400"/> | <img src="Screenshot 2024-10-10 220537.png" width="auto" height="400"/> | <img src="Screenshot 2024-10-10 220425.png" width="auto" height="400"/> |
 |:------------------------------------------------------------:|:------------------------------------------------------------:|:------------------------------------------------------------:|
 | Sign up page | Success message after account creation | Profile photo displayed after signing up |
 
 
 
 
 
 
 
 
 
 
 
 
 
 ## Add Video Page
 The Add Video Page allows users to upload and manage their videos with the following features:
 
 * Add Video Details: Users can add the name of the video, a thumbnail image, and the video file itself.
 * View Uploaded Videos: Users can see all the videos they have previously uploaded in a list.
 * Delete Videos: Users have the option to delete any video they have uploaded.
 * Add More Videos: Users can upload additional videos at any time.
 
 This page provides an easy way to manage and update video content, making it simple for users to organize their uploaded videos.
 
 
 
 # Add Video Views
 
 
 
 | <img src="Screenshot 2024-10-10 220605.png" width="auto" height="400"/> | <img src="Screenshot 2024-10-10 220928.png" width="auto" height="400"/> | <img src="Screenshot 2024-10-10 220939.png" width="auto" height="400"/> |
 |:------------------------------------------------------------:|:------------------------------------------------------------:|:------------------------------------------------------------:|
 | Add video page | Choose the video, name, and thumbnail | Video added |
 
 
 
 
 
 ## Profile Page
 The Profile Page allows users to manage their account and videos with the following features:
 
 * View User Details: Users can see their profile information, including their username and profile picture.
 * Edit Username: Users can change their username directly from the profile page.
 * View Uploaded Videos: Users can view all the videos they have uploaded.
 * Delete Videos: Users have the ability to delete any of their uploaded videos.
 * Sign Out: Users can sign out of their account from this page.
 This page provides users with full control over their profile and uploaded content, making it easy to manage their account and media.
 
 # Profile Views
 
 
 
 | <img src="Screenshot 2024-10-10 221001.png" width="auto" height="400"/> | <img src="Screenshot 2024-10-10 221029.png" width="auto" height="400"/> |
 |:------------------------------------------------------------:|:------------------------------------------------------------:|
 | Profile Page | changing name in profile page |
 
 
 
 
 ## Delete video explain
 The Delete Video feature allows users to remove any video they have uploaded with the following behaviors:
 
 * Video Removal: Once a video is deleted, it will immediately disappear from the video list and the user’s profile page.
 
 * Updated Views: The video will also be removed from the Add Video Page and Profile Page lists, reflecting the updated status in real-time.
 
 This ensures that users can efficiently manage their uploaded videos, with instant feedback on deletions.
 
 # Delete Video Views
 
 
 | <img src="Screenshot 2024-10-10 221058.png" width="auto" height="400"/> | <img src="Screenshot 2024-10-10 221121.png" width="auto" height="400"/> |
 |:------------------------------------------------------------:|:------------------------------------------------------------:|
 | The video exists in search | After deletion, it disappeared from search |
 
 
 
 
 
 
 ## Add video explain
 The Add Video feature allows users to upload a video with the following behaviors:
 
 * Visibility Across Pages: Once a video is added, it will be visible to everyone in multiple sections:
 Watch Video Page: The video can be viewed by others on the platform.
 * Search: The video will appear in search results, allowing users to find it by title.
 * Profile Page: The video will be listed under the user’s uploaded videos in their profile.
 This ensures that uploaded videos are easily accessible across the platform, enhancing the content visibility.
 
 
 # Add Video Views
 
 
 | <img src="Screenshot 2024-10-10 221306.png" width="auto" height="400"/> | <img src="Screenshot 2024-10-10 221213.png" width="auto" height="400"/> |
 |:------------------------------------------------------------:|:------------------------------------------------------------:|
 | Video added and visible in the list | Watch the video on the watch page |
 
 
 
 
 
 ## Edit video explain
 The Edit Video feature allows users to manage their uploaded videos with the following options:
 
 * Change Video Name: Users can modify the name of any video they’ve uploaded. The updated name will be reflected everywhere, including the video list and the Watch Video page.
 * Delete Video: Users have the option to delete their uploaded videos.
 * Replace Video: Users can upload a new video file to replace the existing one.
 This feature provides flexibility for users to keep their video content up to date and ensures that all changes are reflected across the platform.
 
 # Edit video Views
 
 
 | <img src="Screenshot 2024-10-10 221332.png" width="auto" height="400"/> |
 |:------------------------------------------------------------:|
 | Changing the name of the video |
 
 

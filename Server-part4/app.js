const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: '50mb', extended : true}));
app.use(express.json());

const videos = require('./routes/videos');
const users = require('./routes/users');
const comments = require('./routes/comments');
const tokens = require('./routes/tokens');

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');

mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
);

app.use(express.static('public'));

app.use(cors());
app.use('/api/videos', videos);
app.use('/api/users', users);
app.use('/api/comments', comments);
app.use('/api/tokens', tokens);




app.listen(process.env.PORT);
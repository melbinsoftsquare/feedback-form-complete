// Require All Dependencies
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

// The port address used to listen for Web Requests. The default is set as 4000.
const port = process.env.PORT || 4000;

let app = express();

// Set render engin. A render engin will transform a template into an HTML page which will be rendered in web pages.
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: ''}));
app.set('view engine', '.hbs');

// Set a static folder to read images, icons, any files to download
app.use(express.static(path.join(__dirname, 'public')));

// Parse POST requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Submit feedback forms
app.post('/feedback', (req, res) => {
    console.log(res.body);
    res.send('feedback recieved.');
});

// Send the initital page to the browser
app.use('/', (req, res) => {
    res.render('home');
});

// Make the application to listen for web requests
app.listen(port, () => {
    console.log('App Listening at', port);
});

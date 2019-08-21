// Require All Dependencies
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const service = require('./service');

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
    service.createFeedback(req.body)
    .then(() => {
        res.send('feedback recieved.');
    })
    .catch((err) => {
        console.log(err);
        res.send('feedback creation failed');
    });
    
});

// View all submitted feedbacks
app.get('/view-feedbacks', (req, res) => {
    let page = req.query.page;
    page = page || 1;
    service.getFeedbacks(page)
    .then((result) => {
        let hasNextPage = false;
        if (result.length > 10) {
            hasNextPage = true;
            result.splice(10, 1);
        }
        res.render('view-feedback-list', {feedbacks: result, hasNextPage: hasNextPage, hasPreviousPage: page > 1, prevPage: parseInt(page) - 1, nextPage: parseInt(page) + 1, page: page});
    });
});

// View a single feedbacks
app.get('/view-feedback', (req, res) => {
    let feedbackId = req.query.feedbackId;
    if(isNaN(parseInt(feedbackId)) === false) {
        service.getFeedback(feedbackId)
        .then((result) => {
            res.render('view-feedback', {feedback: result});
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
    } else {
        res.send('Feedback Id should be valid.');
    }
})

// Delete a feedback
app.get('/delete', (req, res) => {

});

// Delete All Feedbacks
app.get('/delete-all', (req, res) => {

});

// Send the initital page to the browser
app.use('/', (req, res) => {
    res.render('submit-form');
});

// Make the application to listen for web requests
app.listen(port, () => {
    console.log('App Listening at', port);
});

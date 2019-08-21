const Client = require('pg').Client;
const client = new Client('postgres://zsqqvntrisrllc:6330d9e6aaa26b8bb223830c6060bd20ad8943a493f6e1415913fd74c6d56e66@ec2-23-21-91-183.compute-1.amazonaws.com:5432/dmfvak4h4uu4u?ssl=true');

const connectDb = () => {
    return new Promise((resolve, reject) => {
        client.connect();
        console.log('Database connected.');
        resolve();
    })
}

connectDb()
.then(() => console.log('database connected successfully'));

// Function to create feedback record in database
const createFeedback = (feedback) => {
    return new Promise((resolve, reject) => {
        if (!!feedback.name === false) {
            reject('Name is required');
        }

        if(!!feedback.email === false) {
            reject('Email is required');
        }

        if(!!feedback.feedback === false) {
            reject('Feedback is required');
        }

        client.query('INSERT INTO feedback (name, email, phone, feedback) VALUES ($1, $2, $3, $4)',
            [feedback.name, feedback.email, feedback.phone, feedback.feedback],
            (err, result) => {
                if(!!err === false) {
                    resolve();
                } else {
                    reject(err.message);
                }
        });
    });
}

const getFeedbacks = (page) => {
    page = page || 1;
    page -= 1;
    page = page < 0 ? 0 : page;
    let limit = 10;
    let start = page * limit;
    limit += 1;

    return new Promise((resolve, reject) => {
        console.log('querying with', start, limit);
        client.query('SELECT id, name, email, phone, feedback FROM feedback LIMIT $1 OFFSET $2',
        [limit, start],
        (err, result) => {
            if (!!err === false) {
                resolve(result.rows);
            } else {
                reject(err.message);
            }
        });
    });
}

const getFeedback = (feedbackId) => {
    return new Promise((resolve, reject) => {
        client.query('SELECT id, name, email, phone, feedback, created_at FROM feedback where id = $1::Integer', [feedbackId], (err, result) => {
            if (!!err === false) {
                console.log(result.rows[0]);
                resolve(result.rows[0]);
            } else {
                reject(err.message);
            }
        })
    });
}

const deleteFeedback = (feedbackId) => {
    return new Promise((resolve, reject) => {
        client.query('DELETE FROM feedback where feedbackId = $1::Integer', [feedbackId], (err, resilt) => {
            if (!!err === false) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

module.exports = {
    createFeedback: createFeedback,
    getFeedbacks: getFeedbacks,
    getFeedback: getFeedback,
    deleteFeedback: deleteFeedback
}

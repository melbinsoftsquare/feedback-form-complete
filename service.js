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
        if(!!feedback.name === false) {
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
                    reject(err);
                }
        });
    });
}

const getFeedbacks = (start) => {
    start = start || 0;
    let limit = 10;
    return new Promise((resolve, reject) => {
        client.query('SELECT id, name, email, phone, feedback from feedback limit $1 offset $2',
        [limit, start],
        (err, result) => {
            resolve(result);
        });
    });
}

module.exports = {
    createFeedback: createFeedback
}
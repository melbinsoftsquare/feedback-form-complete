require('dotenv').config();
const Client = require('pg').Client;
const client = new Client('postgres://zsqqvntrisrllc:6330d9e6aaa26b8bb223830c6060bd20ad8943a493f6e1415913fd74c6d56e66@ec2-23-21-91-183.compute-1.amazonaws.com:5432/dmfvak4h4uu4u?ssl=true');

client.connect();

client.query('SELECT now();', (err, result) => {
    console.log(err, result);
});


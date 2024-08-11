// ./database/db-connector.js

// Get an instance of mysql we can use in the app
const { application } = require('express');
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_coalsona',
    password        : '****', // replace with db password
    database        : 'cs340_coalsona'
})

// Export it for use in our applicaiton
module.exports.pool = pool;

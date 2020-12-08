const mysql = require('mysql')
const secrets = require('../secrets')
const database = mysql.createPool(secrets);
module.exports = (sql, arr, callback) =>
{
    database.query(sql, arr, function(error, result) 
    {
        if(error)
        {
            return console.log(error);
        }
        callback(result);
    });
};
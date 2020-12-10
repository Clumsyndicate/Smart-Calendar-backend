const database = require('../database')

module.exports = (username, callback) => {
    const sql = 'SELECT * FROM users WHERE userName=?';
    database(sql, username, result => {
        if (result.length !== 1) {
            callback(null);
        }
        if (result[0].classes) {
            callback(JSON.parse(result[0].classes), JSON.parse(result[0].contact));
        } else {
            callback([], []);
        }
    });
};
const database = require('../database')

module.exports = (username, newlist, contact, callback) => {
    const sql1 = `UPDATE users SET classes='${JSON.stringify({"array": newlist})}', contact='${JSON.stringify(contact)}' WHERE userName='${username}'`;
    database(sql1, username, result => {
        callback(result.changedRows === 0);
    });
};
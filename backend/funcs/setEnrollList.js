const database = require('../database')

module.exports = (username, newlist, contact, callback) => {
    const sql1 = `UPDATE users SET classes='${JSON.stringify({"array": newlist})}', contact='${contact}' WHERE userName='${username}'`;
    console.log(sql1);
    database(sql1, username, result => {
        callback(result.changedRows === 0);
    });
};
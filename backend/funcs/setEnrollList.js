const database = require('../database')

module.exports = (username, newlist) => {
    const sql = `UPDATE users SET classes='${JSON.stringify(newlist)}'  WHERE userName='${username}'`;
    database(sql, username, result => {
        console.log(result);
        return result.changedRows === 1;
    });
};
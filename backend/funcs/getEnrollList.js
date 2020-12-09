const database = require('../database')

module.exports = (username) => {
    const sql = 'SELECT * FROM users WHERE userName=?';
    console.log("username");
    console.log(username);
    database(sql, username, result => {
        if (result.length !== 1) {
            return res.send({
                status: 1,
                msg: 'Username does not existed',
            });
        }
        return result[0].classes ?? []
    });
};
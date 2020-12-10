const express = require('express');
const router = express.Router();
const checkToken = require('../funcs/checkToken');
const database = require('../database');

router.post('/', (req, res) => {
    checkToken(req, res, (decoded) => {
        let userName = decoded.userName
        const sql = `UPDATE users SET schedule='${JSON.stringify(res.body)}' WHERE userName='${userName}'`;
        database(sql, decoded.userName, result => {
            if (result.affectedRows === 1) {
                res.send({
                    status: 0,
                    msg: "Schedule set a success!"
                })
            } else {
                res.send({
                    status: 1,
                    msg: "Schedule set failed!"
                })
            }
        })
    });
});

module.exports = router;
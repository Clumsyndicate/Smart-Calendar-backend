const express = require('express');
const router = express.Router();
const checkToken = require('../funcs/checkToken');
const database = require('../database');

router.get('/', (req, res) => {
    checkToken(req, res, (decoded) => {
        // Do something
        const sql = 'SELECT schedule FROM users WHERE userName=?';

        database(sql, decoded.userName, result => {
            let {schedule} = result;
            res.send(JSON.parse(schedule));
        })
    });
});

module.exports = router;
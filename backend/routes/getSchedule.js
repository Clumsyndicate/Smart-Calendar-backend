const express = require('express');
const router = express.Router();
const checkToken = require('../funcs/checkToken');
const database = require('../database');

router.get('/', (req, res) => {
    checkToken(req, res, (decoded) => {
        // Do something
        const sql = 'SELECT schedule FROM users WHERE userName=?';

        database(sql, decoded.userName, result => {
            if (result.length > 0) {
                let {
                    schedule
                } = result[0];
                console.log(result);
                res.send(JSON.parse(schedule));
            } else {
                res.send({
                    "status": 1,
                    "msg": "user not found"
                })
            }
        })
    });
});

// router.get('/', (req, res) => {
//     let userName = req.body.userName;
//     // Do something
//     const sql = 'SELECT schedule FROM users WHERE userName=?';
//     console.log(userName);
//     database(sql, userName, result => {
//         if (result.length > 0) {
//             let {
//                 schedule
//             } = result[0];
//             console.log(result);
//             res.send(JSON.parse(schedule));
//         } else {
//             res.send({
//                 "status": 1,
//                 "msg": "user not found"
//             })
//         }
//     })
// });

module.exports = router;
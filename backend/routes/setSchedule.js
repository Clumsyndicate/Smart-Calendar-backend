const express = require('express');
const router = express.Router();
const checkToken = require('../funcs/checkToken');
const database = require('../database');

router.post('/', (req, res) => {
    checkToken(req, res, (decoded) => {
        let userName = decoded.userName
        // console.log(req.body);
        const sql = `UPDATE users SET schedule='${JSON.stringify(req.body)}' WHERE userName='${userName}'`;
        // console.log(sql);
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

// router.post('/', (req, res) => {
//     let userName = req.body.userName;
//     const sql = `UPDATE users SET schedule='${JSON.stringify(req.body.schedule)}' WHERE userName='${userName}'`;
//     database(sql, userName, result => {
//         if (result.affectedRows === 1) {
//             res.send({
//                 status: 0,
//                 msg: "Schedule set a success!"
//             })
//         } else {
//             res.send({
//                 status: 1,
//                 msg: "Schedule set failed!"
//             })
//         }
//     })
// });

module.exports = router;
const express = require('express');
const router = express.Router();
const checkToken = require('../funcs/checkToken');
const setEnrollList = require('../funcs/setEnrollList');

router.post('/', (req, res) => {

    checkToken(req, res, (decoded) => {
        // Do something
        console.log(req.body);
        setEnrollList(decoded.userName, req.body.array, req.body.contactInfo, success => {
            if (success) {
                res.send({
                    status: 0,
                    array: req.body.array,
                    userName: req.body.userName,
                });
            } else {
                res.send({
                    status: 1,
                    msg: "Failed to set enroll list or no change is made."
                })
            }
        });
    });
});

module.exports = router;
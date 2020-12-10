const express = require('express');
const router = express.Router();
const checkToken = require('../funcs/checkToken');
const getEnrollList = require('../funcs/getEnrollList');

router.post('/', (req, res) => {
    checkToken(req, res, (decoded) => {
        // Do something
        getEnrollList(decoded.userName, (enrollList, contactInfo) => {
            console.log(enrollList);
            res.send({
                status: 0,
                userName: decoded.userName,
                msg: 'Send message to profile successfully',
                array: enrollList,
                contactInfo: contactInfo
            })
        });

    });
});

module.exports = router;
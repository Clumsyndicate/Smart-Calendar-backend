const express = require('express');
const router = express.Router();
const checkToken = require('../funcs/checkToken');
const database = require('../database');

router.post('/', (req, res) => {
    checkToken(req, res, (decoded) => {
        // Do something
        database("")

    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const database = require('../database')
const webtoken = require('jsonwebtoken')
const config = require('../config')

router.post('/',  (req, res) =>
{
    const sql = 'SELECT * FROM users WHERE userName=?';
    database(sql, req.body.userName, result=>
        {
            if(result.length !== 1)
            {
                return res.send({
                    status:1,
                    msg: 'Username does not existed',
                });
            }
            if(req.body.userPwd !== result[0].userPwd)
            {
                return res.send({
                    status:1,
                    msg: 'Password is not correct',
                });

            }
            const mytoken = webtoken.sign({userName: req.body.userName}, config.webtokenkey, {
                expiresIn: '3h'
            });
            res.send({
                status:0,
                msg: 'Login Successfully',
                mytoken
            });
        });
});
module.exports = router;
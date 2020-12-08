const express = require('express');
const router = express.Router();
const isvalid = require('../middle/isvalid')
const {registerSchema} = require('../schema/register')

const database = require('../database')

router.post('/', isvalid(registerSchema), (req, res) => {
    console.log(req.body);
    const sql = 'SELECT * FROM users WHERE userName=?';
    database(sql, req.body.userName, result=>{
        if(result.length >= 1)
        {
            return res.send({
                status:1,
                msg: 'Username has already existed',
            });
        }
        const sql = 'INSERT INTO users set ?';
        const {userName, userEmail, userPwd} = req.body;
        database(sql, {userName,userEmail,userPwd}, result => {
            if (result.affectedRows === 1)
            {
                return res.send({
                    status: 0,
                    msg:'Register Successfully'
                });
            }
            res.send({
                status:1,
                msg: 'Register failed',
            });
        });
    });
});
module.exports = router;
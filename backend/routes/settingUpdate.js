const express = require('express');
const router = express.Router();


router.post('/',  (req, res) =>
{
    res.send(
    {
        status:0,
        array:req.body.array,
        login: req.body.login,
        userName: req.body.userName,
    }
)   
});

module.exports = router;

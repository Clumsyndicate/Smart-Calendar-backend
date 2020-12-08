const express = require('express');
const router = express.Router();


router.post('/',  (req, res) =>
{
    res.send(
    {
        status:0,
        userName:req.body.userName,
        msg:'Send message to profile successfully',
        array:["CS 666", "QAQ 嘤嘤嘤","Physics 1B", "Math 33A",""],
        
    }
)   
});

module.exports = router;

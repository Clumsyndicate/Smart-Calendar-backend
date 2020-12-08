const express = require('express')
const router = express.Router();

router.post('/',  (req, res) =>
{
    console.log(req.user);
    res.send(
    {
        status:0,
        msg:'Send message to profile successfully',
        username: req.user.username,
        
    }
)   
});

module.exports = router;

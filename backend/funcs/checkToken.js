var jwt = require('jsonwebtoken');
const config = require('../secrets')

module.exports = (req, res, success, defaultUser = null) => {
    if (defaultUser !== null) {
        // Use default username
        let decoded = {
            userName: defaultUser
        };
        success(decoded);
        return;
    } else {
        // Use login token
        var token = req.headers['x-access-token'];
        if (!token) {

            return res.status(401).send({
                status: 1,
                message: 'No token provided.'
            });
        }
        jwt.verify(token, config.webtokenkey, function (err, decoded) {
            if (err) return res.status(500).send({
                status: 1,
                message: 'Failed to authenticate token.'
            });
            success(decoded);
            return;
        });
    }
}
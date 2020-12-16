var express = require('express');
var router = express.Router();
var database = require('../database')
const checkToken = require('../funcs/checkToken');

router.post('/', function (req, res, next) {
    checkToken(req, res, (decoded) => {
        const sql = 'SELECT * FROM users';
        database(sql, decoded.userName, result => {
            if (result.length === 0) {
                res.send({
                    status: 1,
                    msg: "no users found"
                })
            } else {
                let thisUserClasses = new Set();
                result.forEach(function (res, index) {
                    if (res.userName === decoded.userName && res.classes) {
                        JSON.parse(res.classes).forEach(item => thisUserClasses.add(item));
                    }
                });
                thisUserClasses.delete("");

                let returnResult = new Array();
                result.forEach((res, index) => {
                    if (res.userName === decoded.userName) {
                        return;
                    }
                    let {
                        userName,
                        avatar,
                        contact
                    } = res
                    let classes = JSON.parse(res.classes) ?? [];

                    let overlapClasses = new Array();
                    classes.forEach(c => {
                        if (thisUserClasses.has(c)) {
                            overlapClasses.push(c);
                        }
                    });
                    if (overlapClasses.length === 0) {
                        return;
                    }
                    returnResult.push({
                        name: userName,
                        classes: overlapClasses,
                        total: overlapClasses.length,
                        img: avatar,
                        contact: JSON.parse(contact)
                    });
                })
                // Create items array
                // var items = Object.keys(dict).map(function (key) {
                //     return [key, dict[key]];
                // });

                // Sort the array based on the second element
                returnResult.sort(function (first, second) {
                    return second.total - first.total;
                });
                res.send( {
                    status: 0,
                    friendlist: returnResult
                });
            }
        });
    });

});

module.exports = router;
var express = require('express');
var router = express.Router();
var database = require('../database')
const checkToken = require('../funcs/checkToken');

router.post('/', function (req, res, next) {
    checkToken(req, res, (decoded) => {
        const sql = 'SELECT * FROM users';
        database(sql, decoded.userName, result => {
            if (result.length === 0) {
                console.log("No user returned from MySQL");
                res.send({
                    status: 1,
                    msg: "no users found"
                })
            } else {
                let thisUserClasses = new Set();
                result.forEach(function (res, index) {
                    if (res.userName === decoded.userName && res.classes) {
                        console.log(res.classes);
                        JSON.parse(res.classes).forEach(item => thisUserClasses.add(item));
                    }
                });

                let returnResult = new Array();
                result.forEach((res, index) => {
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
                    returnResult.push({
                        name: userName,
                        classes: overlapClasses,
                        total: overlapClasses.length,
                        img: avatar,
                        contact: contact
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
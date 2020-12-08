const Joi = require('@hapi/joi')

const registerSchema = {
    userName: Joi.string().required(),
    userEmail: Joi.string().email().required(),
    userPwd: Joi.string().required(),
    userPwd2: Joi.ref('userPwd')
};

module.exports = {
    registerSchema
};

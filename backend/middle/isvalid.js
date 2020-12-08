const Joi = require('@hapi/joi')
module.exports = schema => (require, res, next) =>
{
    const {error} = Joi.object(schema).validate(require.body);
    if(error)
    {
        throw error;
    }
    next();
}
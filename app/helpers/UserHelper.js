const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error) {
                return res.status(400).json(result.error);
            }
            
            // access data as req.value.body
            if(!req.value) req.value = {};
            req.value.body = result.value;
            next();
        }
    },
    schemas: {
        authSchema: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        })
    }
}
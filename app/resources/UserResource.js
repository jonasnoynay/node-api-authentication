const JWT = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../../config');

const signToken = (id) => {
    return JWT.sign({
        iss: 'projectname',
        sub: id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
       
        const { name, email, password } = req.value.body;
        const newUser = new User({ name, email, password });

        await newUser.save();

        res.json(signToken(newUser.id));
    },

    login: async (req, res, next) => {
        
    },

    secret: async (req, res, next) => {
        console.log('secret hehe');
    }
}
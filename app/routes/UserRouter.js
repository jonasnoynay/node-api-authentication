const express = require('express');
const router = require('express-promise-router')();

const { validateBody, schemas } = require('../helpers/UserHelper');
const UserResource = require('../resources/UserResource');
const passport = require('passport');
const passportConf = require('../../passport');

router.route('/signup')
    .post(validateBody(schemas.authSchema), UserResource.signUp);

router.route('/secret')
    .get(passport.authenticate('jwt', { session: false }), UserResource.secret);

module.exports = router;
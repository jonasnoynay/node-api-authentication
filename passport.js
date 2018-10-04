const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./config');
const User = require('./app/models/User');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
   try {
    //find the user specified in token
    const user = await User.findById(payload.sub);

    //if user doesn't exist, handle it
    if(!user) {
        return done(null, false);
    }

    //Otherwise, return the user
    done(null, user);

   } catch(error) {
       done(error, false);
   }
}
));

// Local Strategy
passport.use( new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    //find the given email
    const user = await User.findOne({ email });
    //if not handle it
    if(!user) return done(null, false);
    //check if password is correct

    //if not correct, handle it

    //return the user
}))
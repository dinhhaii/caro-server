const passport = require('passport');
const passportJWT = require("passport-jwt");
const passportLocal = require('passport-local');

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const UserModel = require('../models/user');

const jwt = new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt_secret'
},
    function (jwtPayload, cb) {
        return UserModel.findById(jwtPayload._id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
);

const local = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return UserModel.findOne({ email, password })
            .then(user => {
                if (!user) {
                    return cb(null, false, { message: 'Incorrect email or password.' });
                }
                console.log(user);
                return cb(null, user, { message: 'Logged In Successfully' });
            })
            .catch(err => cb(err));
    }
);

passport.use(jwt);
passport.use(local);
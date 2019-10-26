const constant = require('../utils/constant');
const bcrypt = require('bcrypt');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const passportLocal = require('passport-local');

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const UserModel = require('../models/user');

const jwt = new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: constant.JWT_SECRET
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
    usernameField: 'username',
    passwordField: 'password'
},
    function (username, password, cb) {
        return UserModel.findOne({username})
            .then(user => {
                if (!user) {
                    return cb(null, false, { message: 'Incorrect username!' });
                }
                bcrypt.compare(password, user.password)
                    .then(result => {
                        if (result) {
                            return cb(null, user, { message: 'Logged In Successfully' });
                        } else {
                            return cb(null, false, { message: 'Incorrect password!' });
                        }
                    })
            })
            .catch(err => cb(err));
    }
);

passport.use(jwt);
passport.use(local);
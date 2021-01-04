const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// function authenticateUser()

function initialize(passport, getUserByEmail) {

    const authenticateUser = (email, password, done) => {

        const user = getUserByEmail(email);
        if(user == null) {
            return done(null, false, { message: 'No user with that email'});
        }
        try {
            if( await bcrypt.compare(password, user.password) ) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect'});
            }
        } catch(err) {
            done(err);
        }
    }

    passport.use( new LocalStrategy( {  usernameField: 'email'} ), authenticateUser );

    password.serializeUser( (user, done) => {

    });

    password.deserializeUser( (id, done) => {
        
    });
}

module.exports = initialize;
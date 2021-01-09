const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// function authenticateUser()

function initialize(passport, getUserByEmail, getUserById) {

    const authenticateUser = async (email, password, done) => { // ?
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
    // solve this ERROR
    // passport.use( new LocalStrategy( {  usernameField: 'email'} ), authenticateUser );

    passport.use( new LocalStrategy( {  usernameField: 'email'}, authenticateUser ));
    
    // @ and pass correct -> ENTER
    passport.serializeUser( (user, done) => done(null, user.id) );

    passport.deserializeUser( (id, done) => {
        return done(null, getUserById(id))
    });
}

module.exports = initialize;
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express');
const app = express();

const flash = require('express-flash');
const session = require('express-session');

const brypt = require('bcrypt');
const passport = require('passport');
const methodOverride = require('method-override');

const PORT = 3000;
const users = [];


const initializePassport = require('./passport-config');
const { request } = require('express');

initializePassport(
    passport,
    email => users.find( user => user.email === email),
    id => users.find( user => user.id === id)
);



app.set('view-engine', 'ejs');
app.use(express.urlencoded( {extended: false}) );

// 22:50-----------------------
app.use(flash());
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
//-------------------------------

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name } )
});


app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
});

// app.post('/login', (req, res) => {

// });

// 25:40
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
});


app.post('/register', checkNotAuthenticated, async (req, res) => {
    // console.log( `req.body.name = ${req.body.name} ` );
    // console.log( `req.body.email = ${req.body.email} ` );
    // console.log( `req.body.password = ${req.body.password} ` );
    try {
        const hashedPassword = await brypt.hash(req.body.password, 10);
        users.push( {
            id: Date.now().toString(),
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
         });
         res.redirect('/login');
    } catch(err) {
        res.redirect('/register');
    }

    // res.render('well-reg.ejs');
    // console.log(users);
});

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})

// check auth for homepage
function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}   

// check not auth for homepage
function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/')
    }
    next();

}

app.listen(PORT, () => {
    console.log(`Server up on localhost:${PORT} ...`);
});
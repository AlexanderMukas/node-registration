const express = require('express');
const app = express();

const brypt = require('bcrypt');
const passport = require('passport');
const PORT = 3000;

const initializePassport = require('./passport-config');
initializePassport(passport);

const users = [];

app.set('view-engine', 'ejs');
app.use(express.urlencoded( {extended: false}) );

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'alex'} )
});


app.get('/login', (req, res) => {
    res.render('login.ejs')
});

app.post('/login', (req, res) => {

});

app.get('/register', (req, res) => {
    res.render('register.ejs')
});


app.post('/register', async (req, res) => {
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
    console.log(users);
});

app.listen(PORT, () => {
    console.log(`Server up on localhost:${PORT} ...`);
});
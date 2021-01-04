const express = require('express');
const app = express();

const PORT = 3000;

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


app.post('/register', (req, res) => {
    console.log( `req.body.name = ${req.body.name} ` );
    console.log( `req.body.email = ${req.body.email} ` );
    console.log( `req.body.password = ${req.body.password} ` );

    res.render('well-reg.ejs');
});

app.listen(PORT, () => {
    console.log(`Server up on localhost:${PORT} ...`);
});
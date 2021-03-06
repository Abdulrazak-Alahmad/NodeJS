const express = require('express');
const mongoose = require('mongoose');
const app = express();

const router=  require('./routes/router')
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
const dbURL = "mongodb+srv://abd1:1234@cluster0.ovmjb.mongodb.net/node-tuts123?retryWrites=true&w=majority";
mongoose.connect(dbURL)
    .then((result) => { 
        app.listen(4000);
    }).catch((err) => {
    });
app.get('/', (req, res) => {
    res.redirect('/posts')
});

app.use('/posts', router)

app.get('/create', (req, res) => {
    res.render('create')
})

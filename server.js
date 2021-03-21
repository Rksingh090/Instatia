var express = require('express')
var path = require('path');
var cors = require('cors');
var fs = require('fs');
var request = require('request');


var app = express();

const PORT = process.env.PORT || 80;


//Body Parser Middleware

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set static path
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/profile/:user', (req, res) => {
    res.render('pages/UserData', { user: req.params.user });
});
app.get('/tag/:tagname', (req, res) => {
    res.render('pages/TagData', { tag: req.params.tagname });
});
app.get('/location/:location', (req, res) => {
    res.render('pages/locPage', { location: req.params.location });
});
app.get('/search/:query', (req, res) => {
    res.render('pages/searchPage', { queries: req.params.query })
})
app.post('/search', (req, res) => {
    var query = req.body.search;
    if (query) {
        res.redirect('/search/' + query + '');
    }
});
app.get('/search',(req,res)=>{
    res.redirect('/')
})
app.get('/post/:shortcode', (req, res) => {
    res.render('pages/downloader',{_shortcode: req.params.shortcode})
});



app.listen(PORT, function () {
    console.log(`we are live on localhost:${PORT}`);
});
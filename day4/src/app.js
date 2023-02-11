const express = require('express');
const path = require('path');
const hbs= require('hbs');
const app = express();

const staticpath = path.join(__dirname, '../public');
const newpath=path.join(__dirname,'../templates/views');
const partials=path.join(__dirname,'../templates/partials');
app.set('view engine', 'hbs');
app.set('views', newpath)
hbs.registerPartials(partials)
// app.use(express.static(staticpath))
app.get('/',(rq,res)=>{
    res.render('index')
})
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/weather', (req, res) => {
    res.render('weather');
})
app.get('*', (req, res) => {
    res.render('404');
})
app.listen(8000, () => {
    console.log('Listening on port')
})
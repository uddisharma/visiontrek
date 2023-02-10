// const express = require('express');
// const path = require('path');
// const app = express();
// console.log(path.join(__dirname, '/public'));
// const staticPath = path.join(__dirname, '/public')
// app.use(express.static(staticPath));
// app.get('/', (req, res) => {
//     res.send('<h1>hello this is home page</h1>');
// })
// app.listen(8000, () => {
//     console.log('<h1>Listening on port</h1>');
// })
const express = require('express')
const path = require('path');
const app = express();
const staticPath = path.join(__dirname, '/temp')
app.set('view engine', 'hbs');
app.set('view engine', staticPath);
app.get('/', (req, res) => {
    res.render('index', {
        newdata: 'Udit Sharma'
    });
})
app.listen(8000, () => {
    console.log('<h1>Listening on port</h1>');
})
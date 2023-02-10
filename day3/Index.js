const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index', {
        name: 'Udit Sharma'
    })
})
app.listen(2000, () => {
    console.log('im listening');
})
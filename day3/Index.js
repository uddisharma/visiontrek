const express = require('express');
const app = express();
app.set('view engine', 'hbs');
app.get('/', (req, res) => {
    res.render('index', {
        name: 'Udit Sharma bhardwaj gamdiwal '
    })
})
app.listen(1000, () => {
    console.log('im listening');
})  
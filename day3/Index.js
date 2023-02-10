const express = require('express');
const app = express();
app.set('views engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index')
})
app.listen(4500)

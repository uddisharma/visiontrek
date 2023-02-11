const express = require('express');
const path = require('path');
const app = express();

const staticpath = path.join(__dirname, '../public');
app.use(express.static(staticpath))
app.get('/', (req, res) => {
    res.send('this is home page');
})
app.get('/about', (req, res) => {
    res.send('this is about page');
})
app.get('*', (req, res) => {
    res.send('sorry page is not available');
})
app.listen(8000, () => {
    console.log('Listening on port')
})
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('hello this is home page')
})
app.listen(8000, () => {
    console.log('Listening on port')
})
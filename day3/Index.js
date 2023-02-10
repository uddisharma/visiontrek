const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('<h1>hello this is home page</h1>');
})
app.listen(8000, () => {
    console.log('<h1>Listening on port</h1>');
})
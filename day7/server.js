const express= require('express');
const sendMail = require('./controller/sendMail.js');
const app   = express();
const PORT = process.env.PORT ||5000;
// app.use(express.json());
app.get('/', (req, res, ) =>{
    res.send('Hello im home page');
})
app.get('/sendmail',sendMail)
app.listen(PORT, ()=>{
    console.log('listening on the port', PORT);
})
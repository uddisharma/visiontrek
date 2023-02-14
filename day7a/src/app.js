const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const detailsModal=require('./modals/senddetail')
require('./db/connect')
// app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const viewpath= path.join(__dirname, '../templates/views');
app.set('view engine', "hbs");
app.set('views', viewpath);
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('/', async (req, res) =>{
    res.render('index');
})
app.post('/details',async (req, res) =>{
    // res.send(req.body.email)
    // res.send(req.body.message);
    res.send(req.body);
//    try {

    const senddet= new detailsModal({
        email: req.body.email,
        message:req.body.message

    })


    const sent= await senddet.save();
    res.status(201).render('index')
    console.log(sent)


//    } catch (error) {
//     res.status(400).send(error)
//    }
})


app.listen(5000,()=>{
    console.log('listening')
})
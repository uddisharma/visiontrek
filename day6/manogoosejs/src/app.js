const mongoose= require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/nayadatabase",{useNewUrlParser: true})
.then(()=>console.log('first'))
.catch((err) => console.log('error'))
const mongoose  = require('mongoose');
const detailsSchema= new mongoose.Schema({
    email:{
        type:"string",
        required:true,
    },
    message:{
        type:"string",
        required:true
    }
});

const detailsModal=  mongoose.model('detail',detailsSchema);
module.exports = {detailsModal};
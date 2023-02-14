const mongoose  = require('mongoose');
const detailsSchema= new mongoose.Schema({
    email:{
        type : String,
        required:true,
    },
    message:{
        type:String, // required,
        required:true
    }
});

const detailsModal=  mongoose.model('detail',detailsSchema);

// const document= async ()=>{
//     try {
//        const data1 = new detailsModal ({
//         email:'uddibhardwaj08@gmail.com',
//         message:'this is a test 1'
//        })
//        const data2 = new detailsModal ({
//         email:'uddibhardwaj08@gmail.com',
//         message:' this is a test 2'
//        })
//        const result = await detailsModal.insertMany([data1, data2])
//        console.log(result)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   document();


module.exports = {detailsModal};
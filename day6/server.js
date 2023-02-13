// const mongoose = require('mongoose');
// const express = require('express');
// const app = express();
// mongoose.set('strictQuery', true);
// mongoose.connect('mongodb://localhost:27017',{useNewUrlParser: true, useUnifiedTopology: true});
// var db = mongoose.connection;
// db.on('open', () => {
//    console.log('Connected to the MongoDB database.')
// })
// db.on('error', (err) => {
//    console.log(`Database error: ${err}`);
// });
// app.listen(3001,()=>{
//     console.log('listening on port 3001')
// })


const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));


// CONNECTING TO MONGODB

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test',(err)=>{
    if (err) console.log(err);
    else console.log('connected');
  });
}

//CREATING THE DATA


const DataType= new mongoose.Schema({
  name: 'string',
  class: 'number',
  course: 'string',
  active:'boolean',
});
 
const ColModal= new mongoose.model('ModalName', DataType);
const document= async ()=>{
  try {
     const data1 = new ColModal ({
      name: 'Deepak Sharma',
      class: '12',
      course:'Maths',
      active: true,
     })
     const data2 = new ColModal ({
      name: 'Udit Sharma',
      class: '11',
      course:'Physics',
      active: false,
     })
     const result = await ColModal.insertMany([data1, data2])
     console.log(result)
  } catch (error) {
    console.log(error)
  }
}
// document();



//READING THE DATA

const getData = async()=>{
  try{
    const res= await ColModal.find({class :{$gte:11}}).select({course:1});
    console.log(res)
  }catch(error){
    console.log(error)
  }
 
}
// getData();


//UPDATING THE DATA

const updateData = async(id)=>{
  try {
    const res= await ColModal.findByIdAndUpdate({_id:id},{$set: {course:'Chemistry Physics'}},{new:true, useFindAndModify:false});
    console.log(res);
  } catch (error) {
console.log(error)
  }
 
}

// updateData("63ea0691610d38e959efb1f7");


//DELETEING THE DATA


const deleteData = async(id)=>{
try {
  const res= await ColModal.findByIdAndDelete({_id:id});
  console.log(res)
} catch (error) {
  console.log(error)
}
}

// deleteData('63ea0691610d38e959efb1f6')
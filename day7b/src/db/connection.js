const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));

// CONNECTING TO MONGODB
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/students',(err)=>{
    if (err) console.log(err);
    else console.log('connected');
  });
}
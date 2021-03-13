const mongoose = require('mongoose');

//configuring db

mongoose.connect('mongodb+srv://GoBillion:GBdev20@cluster0-yltu8.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then(()=> console.log("MongoDB connected"))
  .catch(err => console.log(err));

module.exports = mongoose;

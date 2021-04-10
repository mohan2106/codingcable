const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 4000;
const cors = require("cors");

app.use(cors());
app.get('/', (req, res) => {
 var dataToSend;
 var arr;
 // spawn new child process to call the python script
 const python = spawn('python', ['./script1.py',req.query.ques]);
 // collect data from script
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  console.log('This api has been called from front end');
  dataToSend = data.toString();
  arr = dataToSend.split('$');

  console.log(arr);
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 // res.send(dataToSend)
 res.json({data:arr});
 });
 
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
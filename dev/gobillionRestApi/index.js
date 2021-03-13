require('dotenv').config();
var express = require('express');
var app = express();
var mongoose = require('./mongoose');
const userRouter = require('./routes/users');
const productRouter = require('./routes/product');


//var AuthController = require('./authcontroller');
//app.use('/api', AuthController);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/users',userRouter);
app.use('/products',productRouter);

module.exports = app;
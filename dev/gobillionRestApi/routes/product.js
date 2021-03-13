const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/categories',(req,res)=>{
    var categories = ['Daily Essentials', 'Fruits & Vegetables', 'Cleaning & Household', 'Personal Care', 'Health & Hygiene', 'Baby Care', 'Beauty & Cosmetics', 'Other Accessories', 'Herbal/Ayurveda', 'Pets'];
    res.send(categories).status(200);
})

module.exports = router;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email:{
        type: String,
        unique:true,
    },
    password:{
        type: String
    },
    salt:{
        type:String
    },
    phone:{
        type:String
    },
    phone_verified:{
        type:Boolean,
        default:false
    },
    display_image:{
        type:Boolean
    },
    notifications:{
        type:Boolean,
        default:true
    }
})


UserSchema.pre('save', async function(next){
    const user = this
    if(user.password){
        //user.password = await bcrypt.hash(user.password,8);
        var salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
    }
    
    next()
})


const User = mongoose.model('User',UserSchema);

module.exports = User;
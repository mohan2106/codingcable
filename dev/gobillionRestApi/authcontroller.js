require('dotenv').config();
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var uuid = require('uuid');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var bodyparser = require('body-parser');

// var app = express();
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended:true}));

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

var conn = mysql.createConnection({
    host:'localhost',
    user: 'admin',
    password: 'password',
    database: 'gobillion'
});

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0,length);
}

var sha512 = function(password,salt){ 
    var hash = crypto.createHmac('sha512',salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
}

function saltHashPassword(userPassword){
    var salt = genRandomString(16);
    var passwordData = sha512(userPassword,salt);
    return passwordData;
}
function checkHashPassword(userPassword,salt){
    var passwordData = sha512(userPassword,salt);
    return passwordData;
}

router.post("/register/",(req,res,next)=>{
    var post_data = req.body;
    var uid = uuid.v4();
    var plaint_password = post_data.password;
    var hash_data = saltHashPassword(plaint_password);
    var password = hash_data.passwordHash;
    var salt = hash_data.salt;
    var name = post_data.name;
    var email = post_data.email;
    var phone = post_data.phone;
    console.log(name,phone,email);

    conn.query('SELECT * FROM Users where Phone=?',[phone],function(err,result,fields){
        conn.on('error',function(err){
            console.log('[MySQL ERROR]',err);
        });
        if(result && result.length){
            res.status(400).send({auth:false,token:"NULL",status:"user already exixt"});
        }else{
            conn.query('INSERT INTO Users ( Name, Email, Phone, Password, Salt) VALUES (?,?,?,?,?)'
            ,[name,email,phone,password,salt],function(err2,result2,fields2){
                if(err2){
                    res.status(400).send({auth:false,token:"NULL",status:err2});
		    console.log(err2);
                    throw err;
                }
                conn.on('error',function(err2){
                    console.log('[MySQL ERROR]',err2);
                    res.status(400).send({auth:false,token:"NULL",status:err2});
                });
                // res.json('Register Successfull');
                // res.json(result2);
                var token = jwt.sign({ id: phone }, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                  });
                  res.status(200).send({ auth: true, token: token,status:"Successfull" });
            });
        }
    });


});

router.post('/login/',(req,res)=>{
    var post_data = req.body;
    var user_password = post_data.password;
    var phone = post_data.phone;
    console.log(phone+" "+user_password);
    conn.query('SELECT * FROM Users where Phone=?',[phone],function(err,result,fields){
        conn.on('error',function(err){
            console.log('[MySQL ERROR]',err);
            res.status(400).send({ auth: false, token: "NULL",status:"Wrong Phone number." });
        });
        if(result && result.length){
 	    //console.log(JSON.stringify(result[0]));
            var salt = result[0].Salt;
            var encrypted_password = result[0].Password;
            var hased_password = checkHashPassword(user_password,salt).passwordHash;
            if(encrypted_password == hased_password){
		//console.log(JSON.stringify(result[0]));
                // res.end(JSON.stringify(result[0]));
                var token = jwt.sign({ id: phone },  process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                  });
                  res.status(200).send({ auth: true, token: token,status:"successfull" });
                // res.status(200).send({ auth: token,token:token2, status: 'Successful' });
            }else{
                // res.end(JSON.stringify(result[0]));
                // res.end(JSON.stringify(hased_password));
                // res.json("wrong password");
                  res.status(200).send({ auth: false, token: "NULL",status:"Wrong Password" });
            }
        }else{
            res.status(200).send({auth:false,token:"NULL",status:"user not exixt"});
        }
    });
});

router.get('/me', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      conn.query('SELECT * FROM Users where Phone=?',[decoded.id],function(err,result,fields){
        conn.on('error',function(err){
            console.log('[MySQL ERROR]',err);
        });
        res.end(JSON.stringify(result[0]));
        
    });

    //   res.status(200).send(decoded);
    });
  });
  module.exports = router;

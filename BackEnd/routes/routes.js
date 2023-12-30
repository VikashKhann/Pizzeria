var express=require('express');
var router=express.Router();
var bcrypt = require('bcrypt');
var pizza=require('../models/pizza.js');
var ingredientItem=require('../models/ingredient.js')
var Cart=require('../models/cart.js');
var User = require('../models/user.js');
const jwt = require('jsonwebtoken')
const passport = require("passport")

//console.log('i got pizza'+pizza)
cnt=1;
x=1;
//function for registring new user

router.get('/check', verifyToken, (req, res, next) => {
    res.json({ msg: "All ok" })
})



function addToDB(req, res) {

    var user = new User({
        name: req.body.name,
        //contact: req.body.contact,
        email: req.body.email,
        password: User.hashPassword(req.body.password),
    });

    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        }
        else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretkey')
            res.status(200).json({ token: token })
        }
    })
}
function addtothecart(req,res){
    var cart=new Cart({
        uname:req.body.uname,
        id:req.body.id,
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        type:req.body.type,
        description:req.body.description,
        ingredients:req.body.ingredients,
        topping:req.body.topping
        });
        cart.save((err,response)=>{
            if(err){
                console.log(err);
            }
            else{
                //let dbconnection=result.db();
                //dbconnection.collection("carts").insertOne(body);
                res.json(response);
            }
       })
}
function removefromthecart(req,res){
    var cart=new Cart({
        _id:req.body._id,
        id:req.body.id,
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        type:req.body.type,
        description:req.body.description,
        ingredients:req.body.ingredients,
        topping:req.body.topping
        });

      //  cart.findOneAndRemove({_id:req.body._id}).remove().exec();
        cart.drop((err,response)=>{
            if(err){
                console.log(err);
            }
            else{
                //let dbconnection=response.db('Project_Simulation');
                //dbconnection.collection("carts").deleteOne(body);
               //response.remove();
                res.json(response);
            }
       })
}
router.delete('/deletecart',function (req,res){
    removefromthecart(req,res)
    // Cart.findOneAndRemove({id:req.body.id},(err)=>{
    //     if(err){
    //         console.log(err)
    //     }
    //     else{
    //         res.json(res)
    //     }
    // })
})
router.post('/addcart',function (req,res){
    //let body=req.body;
    addtothecart(req,res)

})
//Registration of user api
router.post('/register', function (req, res, next) {
    addToDB(req, res);
});

//login api
router.post('/login', function (req, res, next) {

    User.findOne({ email: req.body.email }, (err, user) => {
            console.log(req.body.email);
        if (err) {
            console.log(err)
            res.status(401).send(err)
        }
        else {
            if (!user) {
                res.json({ error: 'Invalid Email' })
                console.log("invalid email")
            }
            else {
                bcrypt.compare(req.body.password, user.password).then(match => {
                    if (match) {
                        console.log("Login is successfull");
                        let payload = { subject: user._id }
                        let token = jwt.sign(payload, 'secretkey')
                        res.status(200).json({ token: token})
                        //res.send(user.name)
                    }
                    else {
                        console.log("incoreect passss");
                        res.json({ error: 'Incorrect password!!' })
                    }
                }).catch(err => {
                    console.log("somthing wrong");
                    res.json({ error: 'Somthing went wrong' })
                })
            }
        }
    })
});

router.post('/authenticate',function(req,res) 
{
    ///module.exports.authenticate = (req, res, next) => {
        // call for passport authentication
        passport.authenticate('local', (err, user, info) => {       
            // error from passport middleware
            if (err) return res.status(400).json(err);
            // registered user
            else if (user) return res.status(200).json({ "token": user.generateJwt() });
            // unknown user or wrong password
            else return res.status(404).json(info);
        })(req, res);
    })


function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        //console.log('rh',req.headers);
        return res.status(401).send("unauthorized req")
    }
    let token = req.headers.authorization.split(' ')[1]
    // console.log(token);
    if (token == 'null') {
        return res.status(401).send("unauthorized req")
    }
    let payload = jwt.verify(token, 'secretkey')
    if (!payload) {
        return res.status(401).send("unauthorized req")
    }
    req.userId = payload.subject
    // console.log(req.userId);
    next()
}

//logout
router.post('/logout', function (req, res, next) {
    try {
        req.logout();
        console.log("yayy")
    } catch (error) {
        res.status(500).json({ msg1: error })
    }
    res.status(500).json({ msg: "logged out" })

});





//fetch all pizza api
router.get('/getAllPizza',(req,res)=>{
    pizza.find((err,doc)=>{
        if(err){
            console.log('Error in get data'+err);
        }
        else{
            res.send(doc);
        }
    })
});

//fetch all ingredients
router.get('/getAllIngredients',(req,res)=>{
    ingredientItem.find((err,doc)=>{
        if(err){
            console.log('Error in get data'+err);
        }
        else{
            res.send(doc);
        }
    })
});

router.get('/getcart',(req,res)=>{
    Cart.find((err,doc)=>{
        if(err){
            console.log('Error in get data'+err);
        }
        else{
            res.send(doc);
        }
    })
});
router.get('/username',(req,res)=>{
    userSchema.find((err,doc)=>{
        if(err){
            console.log('Error in get data'+err);
        }
        else{
            res.send(doc);
        }
    })
})

//add to cart
function secondtimecart(req, res, oldcart, newpizza) {
    var oldavail = false;
    
   
    var newtotal = oldcart.total + newpizza.price;
    var tot;
   
    var oldpiizajsonarr = oldcart['pizza']
    //oldpiizajsonarr.count=0;
    for (var i = 0; i < oldpiizajsonarr.length; i++) {
         console.log("old",oldpiizajsonarr.length);
        // console.log("new",newpizza._id);
        //console.log("here",oldpiizajsonarr[i]._id,newpizza._id);
       var id1= oldpiizajsonarr[i]._id;
       var id2 = newpizza._id;
        
        if (id1===id2) {
            console.log("here",id1,id2);

            oldavail = true;
        }
       
    }
    console.log(oldavail);
    if (oldavail) {
        
        //oldpiizajsonarr.count=1;
       // console.log("count",oldpiizajsonarr.count);
        for (var i = 0; i < oldpiizajsonarr.length; i++) {
            if (oldpiizajsonarr[i]._id === newpizza._id) {
                //x=oldpiizajsonarr[i].count;
                
                // if(isNaN(x))
                // x=0
                
                cnt += 1;
                oldcart.total += oldpiizajsonarr[i].price
                tot = oldcart.total
                oldpiizajsonarr[i].count=cnt;
                //oldpiizajsonarr[i].count
                
                console.log("co",oldpiizajsonarr[i].count);
            }
        }

        //console.log("old",oldpiizajsonarr);

        Cart.updateOne({ _id: oldcart._id }, {
            pizza: oldpiizajsonarr,
            total: tot
        }, function (err, ct) {

            if (err) {
                console.log(err)
                res.status(500).json({ msg: err })
            }
            else {
                console.log("edited cart in old avail");
                res.json({ msg: "pizza added to the cart" })
            }
        })
    }
    else {
      
        console.log("no not in cart");
        oldpiizajsonarr.push(newpizza)
        Cart.updateOne({ _id: oldcart._id }, {
            pizza: oldpiizajsonarr,
            total: newtotal


        }, function (err, ct) {

            if (err) {
                console.log(err)
                res.status(500).json({ msg: err })
            }
            else {
                console.log("edited cart");
                res.json({ msg: "pizza added to the cart" })
            }
        })

    }
}


//insert and update to cart api
router.post('/addtocart',verifyToken,function (req, res) {
    //console.log("req",req)
    Cart.findOne({ whichuser: req.userId },(error, cart) => {
        console.log("Req",req.userId)
        if (error) {
            console.log(error)
            res.status(401).send(error)
        }
        else {
            if (!cart) {
                //console.log("firsttime");
                var cart = new Cart({
                   whichuser: req.userId,
                    pizza: req.body,
                    total: req.body.price
                });
                cart.save((error, ct) => {
                    if (error) {
                        console.log(error);
                        res.json({ msg: error })
                    }
                    else {
                        console.log("sucess fully added your first item");
                        res.json({ msg: "success", cart: ct })
                    }
                })
            }
            else {
                console.log("secondtime");
                secondtimecart(req, res, cart, req.body,);
                // res.json({ error: 'second time' })
            }
        }
    })


    // res.json({ msg: "success"})      
});


//fetch cart item api
router.get('/getcartitem', verifyToken, (req, res) => {
    Cart.find({ whichuser: req.userId },(err, doc) => {
        if (err) {
            res.status(500).json({ error: err })
        }
        res.send(doc)
    })
})




//post Api
/*router.post('/',(req,res)=>{
    let pizzaObj = new Pizza({
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        type:req.body.type,
        description:req.body.description,
        ingredients:req.body.ingredients,
        topping:req.body.topping,
    })

});*/

module.exports = router;  



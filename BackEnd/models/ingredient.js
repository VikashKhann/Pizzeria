var mongoose = require('mongoose');

var ingredientItem = mongoose.Schema({
    id:{type:Number},
    tname:{type:String},
    price:{type:Number},
    image:{type:String},
    
   
});

module.exports = mongoose.model('ingredients',ingredientItem);
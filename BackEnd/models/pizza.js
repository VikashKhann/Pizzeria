var mongoose = require('mongoose');

var Pizza = mongoose.model('pizza',{
    id:{type:Number},
    name:{type: String},
    price:{type: Number},
    image:{type: String},
    type:{type: String},
    description:{type: String},
    ingredients:{type: Array},
    topping:{type: Array},
});

module.exports = Pizza;
var mongoose = require('mongoose');

var Cart = mongoose.Schema({
    uname:{type:String},
    id:{type:Number},
    name:{type: String},
    price:{type: Number},
    image:{type: String},
    type:{type: String},
    description:{type: String},
    ingredients:{type: Array},
    topping:{type: Array},
});

module.exports = mongoose.model('cart',Cart);











// var mongoose = require('mongoose');

// var Cart = mongoose.Schema({

//       whichuser: {
//         type: String,
//         default:0
//     },
//     pizza: {
//        type:Array,
//        default:[],
//        quantity: {
//         type:Number,
//         default:1
//     }

//     },
//     total: {
//         type:Number,
//         default:0
//     },
    
// });

// module.exports = mongoose.model('cart',Cart);
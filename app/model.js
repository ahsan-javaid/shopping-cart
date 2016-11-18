var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var productSchema = new Schema({
    name: { type: String },
    id:{ type: String },
    image: { type: String },
    description: { type: String },
    price:{type:Number}
});
var Product = mongoose.model('Product', productSchema); // Add schema to model
module.exports = Product;

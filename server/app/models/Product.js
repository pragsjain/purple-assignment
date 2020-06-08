// importing mongoose module
const mongoose = require('mongoose')
// import schema 
const Schema = mongoose.Schema;


let productSchema = new Schema(
    {
        id: {
            type: String,
            unique: true
        },
        name: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        short_description: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        },
        our_price: {
            type: String,
            default: ''
        },
        items_in_stock:{
            type: String,
            default: ''
        },
        date_added: {
            type: Date,
            default: Date.now
        }
      
    }
)

mongoose.model('Product', productSchema);

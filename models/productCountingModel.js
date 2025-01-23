const mongoose = require('mongoose');


const productCountingDetailsSchema = new mongoose.Schema({
    reportId : {
        type : String,
        reqiured : true
    },

    filePaths: { type: [String], default: [] },

    items : [
        {
            productCode : String,
            productName : String,
            productionQuantity : Number
        }
    ]
});

const productCountingDetails = mongoose.model('ProductCountingDetails' , productCountingDetailsSchema);
module.exports = productCountingDetails;
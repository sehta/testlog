var mongoose = require('mongoose');

var luckyLunchSchema = {
    date: { type: Date, required: true },
	availableLunch: { type: Number }, 
	companyid: {
	    type: mongoose.Schema.Types.ObjectId, ref: 'Company'
	},
	luckyMatch:  {
    		type: mongoose.Schema.Types.ObjectId, ref: 'Match'
	},
	luckyUsers: [String]

  	
};

var schema = new mongoose.Schema(luckyLunchSchema);

module.exports = schema; 
module.exports.luckyLunchSchema = luckyLunchSchema;

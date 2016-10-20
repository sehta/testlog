var mongoose = require('mongoose');

var companySchema = {
	name: { type: String, required: true}, 
	country: { type: String }, 
	city: { type: String },
	branchname: { type: String }, 
	regdate: { type: Date, required: true },
	logo: { type: String },
	isdisable: { type: Boolean },
	userunitprice: { type: Number }
};

module.exports = new mongoose.Schema(companySchema);
module.exports.companySchema = companySchema;

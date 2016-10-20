var mongoose = require('mongoose');

var restaurantdiscountSchema = {
	discountDate: { type: Date, required: true },
	discountPrice: { type: Number },
	discountUnit: { type: String },
	restaurantid: {
	    type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'
	},
};

module.exports = new mongoose.Schema(restaurantdiscountSchema);
module.exports.restaurantdiscountSchema = restaurantdiscountSchema;
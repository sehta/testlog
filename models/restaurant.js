var mongoose = require('mongoose');

var restaurantSchema = {
	name: { type: String, required: true}, 
	address: { type: String },
	zip: { type: String },
	price: Number,
	phone: { type: String },
	cuisine: [ String ],
	halal: { type: Boolean },
	veg: { type: Boolean },
	total: Number,
	website: { type: String },
	cleanliness_grade: { type: String },
	rating: [{ userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, rating: { type: Number }, comment: { type: String }, date: { type: Date } }]
};

module.exports = new mongoose.Schema( restaurantSchema );
module.exports.restaurantSchema = restaurantSchema; 
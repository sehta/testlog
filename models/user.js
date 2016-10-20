var mongoose = require('mongoose');

var userSchema = {
	inPool: { type: Boolean }, 
	name: { type: String, required: true },
    firstname:{type: String,required:true},
    lastname:{type:String,required:true},
	password: { type: String, required: true }, 
	gender: { type: Number }, 
	title: { type: String }, 
	linkedin: { type: String }, 
	picture: { type: String }, 
	email: { type: String, required: true }, 
	phone: { type: String },
	mobilephone: { type: String },
	tagline: { type: String }, 
	nationality: { type: String },
	cuisine: [String],
	veg: { type: Boolean },
	halal: { type: Boolean },
	lunchCount: { type: Number },
	dropCount: { type: Number },
	available: [String],
	role: [String],
	isPause: { type: Boolean },
	isDisable: { type: Boolean },
	isSendNotification: { type: Boolean },
	isVocationPeriod:{type:Boolean},
	vocationFrom: { type: Date },
	vocationTo: { type: Date },
	days: [String],
	cardColor: { type: String },
	position: { type: String },
	department: { type: String },
	office: { type: String },
	companyid: {
	    type: mongoose.Schema.Types.ObjectId, ref: 'Company'
	},
	blocked: [ {
    		type: mongoose.Schema.Types.ObjectId, ref: 'User'
 		 } 
  	],
	known: [ {
	    type: mongoose.Schema.Types.ObjectId, ref: 'User'
	  } 
	],
	blockedRestaurants: [ {
	    type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'
	  } 
	],
	isRegistered: { type: Boolean, default: false },
    registerStep:{type:String}
};

var schema = new mongoose.Schema( userSchema );

schema.virtual('username').get(function(){
	return (this.email);
});

schema.virtual('knownCount').get(function(){
	return (this.known.length);
});
schema.virtual('blockedCount').get(function(){
	return (this.blocked.length);
});


module.exports = schema; 
module.exports.userSchema = userSchema; 

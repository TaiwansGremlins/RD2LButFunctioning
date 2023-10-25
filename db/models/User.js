/* This is a User Profile for the site itself, nothing to do with Leagues necessarily */
const mongoose = require('mongoose');
const { Schema } = mongoose;
// TODO steam authentication

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	steam_id: {
		type: Number,
		unique: true,
		required: true
	},
});

UserSchema.statics.authenticate = function(todo, callback) {
	//TODO authenticate user
	return callback();
}

var User = mongoose.model('users', UserSchema);
module.exports = User;
/* This is a User Profile for the site itself, nothing to do with Leagues necessarily */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
	steam_id: {
		type: Number,
		unique: true,
		required: true
	},
	profile_url: {
		type: String,
		unique: true,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		required: true
	},
	country: {
		type: String,
	},
	last_steam_login: {
		type: Number
	}
});

var User = mongoose.model('users', UserSchema);
module.exports = User;
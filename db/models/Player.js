const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlayerSchema = new Schema({
	user_id: {
		type: Number,
		unique: true,
		required: true
	},
	picture: {
		type: String,
		unique: true,
		required: true,
	},
	rank: {
		type: Number,
		required: true
	}
});

var Player = mongoose.model('players', PlayerSchema);
module.exports = Player;
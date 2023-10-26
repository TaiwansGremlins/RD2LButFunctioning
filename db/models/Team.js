const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeamSchema = new Schema({
	captain_steam_id: {
		type: Number,
		required: true
	},
	steam_team_id: {
		type: Number,
		unique: true
	},
	team_name: {
		type: String,
		required: true
	},
	team_photo: {
		type: String
	},
	country: {
		type: String
	},
	players: [ { type: String }]
});

var Team = mongoose.model('teams', TeamSchema);
module.exports = Team;
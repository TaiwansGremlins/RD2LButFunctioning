const mongoose = require('mongoose');
const { Schema } = mongoose;

const LeagueSchema = new Schema({
	league_id: {
		type: Number,
		unique: true
	},
	league_name: {
		type: String,
		unique: true
	},
	league_desc: {
		type: String
	},
	max_mmr: {
		type: Number
	},
	min_mmr: {
		type: Number
	}
});

var League = mongoose.model('leagues', LeagueSchema);
module.exports = League;
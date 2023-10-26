const mongoose = require('mongoose');
const { Schema } = mongoose;

const LeagueSchema = new Schema({
	league_id: {
		type: Number,
	},
	league_name: {
		type: String,
		unique: true,
		required: true
	},
	league_desc: {
		type: String
	},
	max_mmr: {
		type: Number
	},
	min_mmr: {
		type: Number
	},
	seasons: [{
		type: Schema.Types.ObjectId, ref: 'seasons'
	}]
});

var League = mongoose.model('leagues', LeagueSchema);
module.exports = League;
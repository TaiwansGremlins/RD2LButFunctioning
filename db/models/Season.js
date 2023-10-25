const mongoose = require('mongoose');
const { Schema } = mongoose;

const SeasonSchema = new Schema({
	season_id: {
		type: Number,
		required: true
	},
	season_name: {
		type: String,
		required: true
	},
	start_date: {
		type: Date,
		required: true
	},
	end_date: {
		type: Date,
		required: true
	}
});

var Season = mongoose.model('seasons', SeasonSchema);
module.exports = Season;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const SeasonSchema = new Schema({
	season_id: {
		type: Number,
	},
	season_name: {
		type: String,
		required: true
	},
	start_date: {
		type: Date,
	},
	end_date: {
		type: Date,
	},
	divisions: [{
		type: Schema.Types.ObjectId, ref: 'divisions'
	}]
});

var Season = mongoose.model('seasons', SeasonSchema);
module.exports = Season;
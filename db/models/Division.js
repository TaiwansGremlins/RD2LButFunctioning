const mongoose = require('mongoose');
const { Schema } = mongoose;

const DivisionSchema = new Schema({
	division_name: {
		type: String,
		required: true
	},
	division_desc: {
		type: String
	},
	players: [{ type: Schema.Types.ObjectId, ref: 'players' }],
	teams: [{ type: Schema.Types.ObjectId, ref: 'teams' }]
});

var Division = mongoose.model('divisions', DivisionSchema);
module.exports = Division;
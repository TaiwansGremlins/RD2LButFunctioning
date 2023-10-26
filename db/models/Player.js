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
	},
	username: {
		type: String,
		required: true
	},
	profile_url: {
		type: String,
		required: true
	},
	leagues: [{ type: Schema.Types.ObjectId, ref: 'leagues' }],
	teams: [{ type: Schema.Types.ObjectId, ref: 'teams' }],
	recent_matches: [{
		match_id: {
			type: Number,
			required: true
		},
		duration: {
			type: Number,
			required: true
		},
		radiant_win: {
			type: Boolean,
			required: true
		},
		game_mode: {
			type: Number,
			required: true
		},
		lobby_type: {
			type: Number,
			required: true
		},
		hero_id: {
			type: Number,
			required: true
		},
		kills: {
			type: Number,
			required: true
		},
		deaths: {
			type: Number,
			required: true
		},
		assists: {
			type: Number,
			required: true
		},
		average_rank: {
			type: Number,
			required: true
		},
		xp_per_min: {
			type: Number,
			required: true
		},
		gold_per_min: {
			type: Number,
			required: true
		},
		tower_damage: {
			type: Number,
			required: true
		},
		hero_healing: {
			type: Number,
			required: true
		},
		last_hits: {
			type: Number,
			required: true
		},
		lane_role: {
			type: Number
		},
		party_size: {
			type: Number
		}
	}]
}, { timestamps: true });

var Player = mongoose.model('players', PlayerSchema);
module.exports = Player;
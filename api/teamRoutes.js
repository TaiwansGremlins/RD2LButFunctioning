const requireLogin = require('../middlewares/requireLogin');
const createError = require('http-errors');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Team = mongoose.model('teams');
const Player = mongoose.model('players');

module.exports = (app) => {
	app.post('/api/teams/create', requireLogin, async (req, res, next) => {
		const captain_id = req.body.captain_id;
		const team_name = req.body.team_name;
		const steam_team_id = req.body.steam_team_id
		const team_photo = req.body.team_photo
		const country = req.body.country

		if(captain_id == null) {
			const httpError = createError(422, "No captain id was provided");
			return next(httpError);
		}
		const captain = await Player.findOne({user_id: captain_id});
		if(!captain) {
			const httpError = createError(422, "No Captain with that ID exists");
			return next(httpError);
		}
		if(team_name == null) {
			const httpError = createError(422, "No team name was provided");
			return next(httpError);
		}

		const team = new Team({
			captain_steam_id: captain_id,
			team_name: team_name,
			steam_team_id: steam_team_id,
			team_photo: team_photo,
			country: country,
			players: [captain_id]
		});
		team.save().then((result) => {
			captain.teams.push(team);
			captain.save();

			return res.status(200).send(team);
		}).catch((error) => {
			const httpError = createError(500, error);
			return next(httpError);
		});
		
	});
}
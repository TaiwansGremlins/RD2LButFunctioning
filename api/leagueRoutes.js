const requireLogin = require('../middlewares/requireLogin');
const createError = require('http-errors');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const League = mongoose.model('leagues');

module.exports = (app) => {
	app.post('/api/leagues/create', requireLogin, async (req, res, next) => {
		const league_id = req.body.league_id
		const league_name = req.body.league_name
		const league_desc = req.body.league_desc
		const max_mmr = req.body.max_mmr
		const min_mmr = req.body.min_mmr
		if(league_name) {

			const leagueExists = await League.findOne({league_name: league_name})
			if(!leagueExists) {
				const league = new League({
					league_id: league_id,
					league_name: league_name,
					league_desc: league_desc,
					max_mmr: max_mmr,
					min_mmr: min_mmr
				}).save();
				return res.status(200).send(league);
			} else {
				const httpError = createError(422, "League Name Already Exists");
				return next(httpError);
			}
		} else {
			const httpError = createError(422, "No League Name provided");
			return next(httpError);
		}
	});
}
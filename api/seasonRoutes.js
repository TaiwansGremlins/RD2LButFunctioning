const requireLogin = require('../middlewares/requireLogin');
const createError = require('http-errors');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Season = mongoose.model('seasons');
const League = mongoose.model('leagues');

module.exports = (app) => {
	app.post('/api/leagues/season/create', requireLogin, async (req, res, next) => {
		const league_id = req.body.league_id;
		const season_name = req.body.season_name;
		const season_id = req.body.season_id;
		const start_date = req.body.start_date;
		const end_date = req.body.end_date;

		if(!league_id) {
			const httpError = createError(422, "No league id provided");
			return next(httpError);
		}
		if(!season_name) {
			const httpError = createError(422, "No season name provided");
			return next(httpError);
		}
		const league = await League.findOne({_id: league_id});
		if(league) {
			const season = new Season({
				season_name: req.body.season_name,
				season_id: req.body.season_id,
				start_date: req.body.start_date,
				end_date: req.body.end_date
			});
			season.save().then((result) => {
				league.seasons.push(season);
				league.save();
				res.status(200).send(season);
			}).catch((error) => {
				const httpError = createError(500, error);
				return next(httpError);
			});
		} else {
			const httpError = createError(422, "No league found with provided id");
			return next(httpError);
		}
	});
}
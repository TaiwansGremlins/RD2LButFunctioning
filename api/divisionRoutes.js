const requireLogin = require('../middlewares/requireLogin');
const createError = require('http-errors');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Season = mongoose.model('seasons');
const Division = mongoose.model('divisions');

module.exports = (app) => {
	app.post('/api/leagues/season/division/create', requireLogin, async (req, res, next) => {
		const season_id = req.body.season_id;
		const division_name = req.body.division_name;
		const division_desc = req.body.division_desc;

		if(!season_id) {
			const httpError = createError(422, "No season id provided");
			return next(httpError);
		}
		if(!division_name) {
			const httpError = createError(422, "No division name provided");
		}

		const season = await Season.findOne({_id: season_id});
		if(season) {
			const division = new Division({
				division_name: division_name,
				divison_desc: division_desc
			});
			division.save().then((result) => {
				season.divisions.push(division);
				season.save();
				res.status(200).send(division);
			}).catch((error) => {
				const httpError = createError(500, error);
				return next(httpError);
			});
		} else {
			const httpError = createError(422, "No season found with provided id");
			return next(httpError);
		}
	});
}
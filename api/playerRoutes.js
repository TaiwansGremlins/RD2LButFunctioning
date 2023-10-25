const requireLogin = require('../middlewares/requireLogin');
const createError = require('http-errors');

module.exports = (app, openDota) => {

	app.get('/api/playerData', requireLogin, async (req, res, next) => {
		const user_id = req.query.user_id;

		if(user_id) {
			// TODO, get player info, recent matches, wordcloud maybe... it takes a LONG time

			//TODO check mongodb for cached data, update if data > 5 days old

			//if no cached data, or it's out of date, call into open dota for an update
			Promise.all([
				openDota.getPlayer(user_id),
				openDota.getRecentMatches(user_id)]
			).then(results => {
				var[playerData, recentMatches] = results

				// TODO create user model for mongo, format data to match, cache
				res.status(200).send({playerData: playerData, recentMatches: recentMatches});
			}).catch(error => {
				const httpError = createError(500, error);
				return next(httpError);
			});
		} else {
			const httpError = createError(500, "Missing User ID");
			return next(httpError);
		}
	})
}
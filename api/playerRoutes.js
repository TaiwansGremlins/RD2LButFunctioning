const requireLogin = require('../middlewares/requireLogin');
const createError = require('http-errors');

const Player = mongoose.model('players');

module.exports = (app, openDota) => {

	app.get('/api/playerData', requireLogin, async (req, res, next) => {
		const user_id = req.query.user_id;

		if(user_id) {			
			//TODO check mongodb for cached data, update if data > 5 days old
			const existingPlayer = await User.findOne({steam_id: user_id})

			if(existingUser) {
				// return user
				return res.status(200).send(existingPlayer)
			} else {
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
			}

			
		} else {
			const httpError = createError(500, "Missing User ID");
			return next(httpError);
		}
	})
}
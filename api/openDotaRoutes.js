/* THIS IS TEMPORARY AS POC, WILL BE REPLACED LATER IF I FEEL LIKE IT */
const requireLogin = require('../middlewares/requireLogin');
const createError = require("http-errors");

module.exports = (app, openDota) => {

	app.get('/api/player', requireLogin, async (req, res, next) => {
		const user_id = req.query.user_id;

		if(user_id) {
			openDota.getPlayer(user_id).then(response => {
				res.status(200).send({response: response});
			});
		} else {
			const httpError = createError(500, "Missing User ID");
			return next(httpError);
		}
	});

	app.get('/api/player/recentMatches', requireLogin, async (req, res, next) => {
		const user_id = req.query.user_id;

		if(user_id) {
			openDota.getRecentMatches(user_id).then(response => {
				res.status(200).send({response: response});
			});
		} else {
			const httpError = createError(500, "Missing User ID");
			return next(httpError);
		}
	});

	app.get('/api/player/wordCloud', requireLogin, async (req, res, next) => {
		const user_id = req.query.user_id;

		if(user_id) {
			//TODO figure out what the sort string param is, no documentation on it
			openDota.getWordcloud(user_id, { limit: 200, sort: "y" }).then(response => {
				res.status(200).send({response: response});
			})
		} else {
			const httpError = createError(500, "Missing User ID");
			return next(httpError);
		}
	})

	// Prob won't ever use this.
	app.get('/api/playerSearch', requireLogin, async (req, res, next) => {
		const name = req.query.player_name;

		if(name) {
			openDota.search({ q: name}).then(response => res.status(200).send({response: response}));
		} else {
			const httpError = createError(500, "Missing player name to search");
			return next(httpError);
		}

	})

	app.get('/api/heroes', requireLogin, async (req, res, next) => {
		openDota.getHeroes().then(response => res.status(200).send({response: response}));
	})

	// Should not make this available to users, maybe if someone wants to pay me to refresh their data lol
	// can run an op every week to refresh data if needed... will have to evaluate.
	app.post('/api/refreshPlayerData', requireLogin, async (req, res, next) => {
		const user_id = req.body.user;

		if(user_id) {
			openDota.playersRefresh(user_id).then(response => {
				res.status(200).send({response: response});
			})
		} else {
			const httpError = createError(500, "Missing User ID");
			return next(httpError);
		}
	});
}
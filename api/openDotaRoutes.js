/* THIS IS TEMPORARY AS POC, WILL BE REPLACED LATER IF I FEEL LIKE IT */
const requireLogin = require('../middlewares/requireLogin');
const createError = require("http-errors");

module.exports = (app, openDota) => {

	app.get('/api/player', requireLogin, async (req, res, next) => {
		const user_id = req.query.user_id;

		if(user_id){
			res.status(200).send({
				'user_id': user_id,
			});
		} else {
			const httpError = createError(500, "Missing User ID");
			return next(httpError);
		}
	});
}
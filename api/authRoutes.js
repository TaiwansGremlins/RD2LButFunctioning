const createError = require('http-errors');
const passport = require('passport');

module.exports = (app) => {
	app.get('/auth/steam',
		passport.authenticate('steam'),
		function(req, res) {
			res.redirect('/');
	});

	app.get('/auth/steam/return',
		passport.authenticate('steam', { failureRedirect: '/login' }),
		function(req, res) {
			//success
			console.log(res)
			console.log(req)
			res.redirect('/');
		});
}
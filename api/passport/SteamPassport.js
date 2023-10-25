const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const keys = require('../../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.use(new SteamStrategy({
		returnURL: 'http://localhost:3000/auth/steam/return',
		realm: 'http://localhost:3000',
		apiKey: keys.steamAPI
	},
	function(identifier, profile, done) {
		// TODO store/find user 
		console.log(identifier)
		console.log(profile)
		console.log(done)

		return done("empty", profile)
	})
)
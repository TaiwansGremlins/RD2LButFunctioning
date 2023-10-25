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
	async function(identifier, profile, done) {
		const json = profile._json
		if(!json) {
			return done("empty", null) // edge case, unsure if possible
		}

		const steamId = steamID64toSteamID32(json.steamid)
		const existingUser = await User.findOne({ steam_id: steamId})
		
		if(existingUser) {
			return done("empty", existingUser);
		} else {
			//create user
			const user = await new User({
				steam_id: steamId,
				profile_url: json.profileurl,
				username: json.personaname,
				avatar: json.avatarfull,
				country: json.loccountrycode,
				lastlogin: json.lastlogoff
			}).save();
			return done("empty", user); //passing null to done causing problems, will revist
		}
	})
)

// In order to use dota 2 api's, needs to be in 32 bits rather than 64
function steamID64toSteamID32 (steamID64) {
    return Number(steamID64.substr(-16,16)) - 6561197960265728
}
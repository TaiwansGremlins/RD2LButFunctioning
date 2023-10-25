const requireLogin = require('../middlewares/requireLogin');
const createError = require('http-errors');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Player = mongoose.model('players');

module.exports = (app, openDota) => {

	app.get('/api/playerData', requireLogin, async (req, res, next) => {
		const user_id = req.query.user_id;

		if(user_id) {			
			//TODO check mongodb for cached data, update if data > 5 days old
			const existingPlayer = await Player.findOne({user_id: user_id})

			if(existingPlayer) {
				// return user
				return res.status(200).send(existingPlayer)
			} else {
				//if no cached data, or it's out of date, call into open dota for an update
				Promise.all([
					openDota.getPlayer(user_id),
					openDota.getRecentMatches(user_id)]
				).then(results => {
					var[playerData, recentMatches] = results

					const player = new Player({
						user_id: user_id,
						rank: playerData.rank_tier,
						picture: playerData.profile.avatarfull,
						username: playerData.profile.personaname,
						profile_url: playerData.profile.profileurl,
						recent_matches: recentMatches.map((match) => ({
							
									match_id: match.match_id,
									duration: match.duration,
									radiant_win: match.radiant_win,
									game_mode: match.game_mode,
									lobby_type: match.lobby_type,
									hero_id: match.hero_id,
									kills: match.kills,
									deaths: match.deaths,
									assists: match.assists,
									average_rank: match.average_rank,
									xp_per_min: match.xp_per_min,
									gold_per_min: match.gold_per_min,
									tower_damage: match.tower_damage,
									hero_healing: match.hero_healing,
									last_hits: match.last_hits,
									lane_role: match.lane_role,
									party_size: match.pary_size
						}))
					});
					player.save();

					// TODO create user model for mongo, format data to match, cache
					res.status(200).send(player);
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
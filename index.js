// Dependencies
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const errorHandler = require('./middlewares/errorHandler');

// API Dependencies
// Temporarily using OpenDota for PoC, will replace with Valve API later
const { OpenDota } = require("opendota.js");
const openDota = new OpenDota(keys.OPEN_DOTA_API);

// Express Variables
const express = require('express');
const app = express();

/* SETUP */
console.log(keys.MONGO_ROUTE);
// TODO call into mongo
app.use(bodyParser.json());
app.use(
	cookieSession({
		name: 'session',
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.COOKIE_KEY]
	})
);
app.use(errorHandler);


/* ROUTES */
require("./api/general")(app);
require("./api/openDotaRoutes")(app, openDota);

if(process.env.NODE_ENV === 'production') {

	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

/* Set up Ports */
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening to port ${port}`);
});
// External Dependencies

// API Dependencies

// Express Variables
const express = require('express');
const app = express();
const port = 3000;


/* ROUTES */
app.listen(port, () => {
	console.log(`listening to port ${port}`);
});

app.get('/', (req, res) => {
	res.sendFile('index.html', {root: __dirname});
});
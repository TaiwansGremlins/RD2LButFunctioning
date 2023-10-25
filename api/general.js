module.exports = app => {
	app.get('/test', async (req, res) => {
		res.status(200).json({ message: "Test Data!" });
	});

	app.get('/', (req, res) => {
		// TODO redirect routes to a react project
		res.sendFile('index.html', {root: './'});
	});
}
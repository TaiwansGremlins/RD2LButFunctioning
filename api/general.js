module.exports = app => {
	app.get('/test', async (req, res) => {
		res.status(200).json({ message: "Test Data!" });
	});

	app.get('/', (req, res) => {
		res.sendFile('index.html', {root: './'});
	});
}
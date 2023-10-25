module.exports = (req, res, next) => {
	if(false) {
		return res.status(401).send({ error: 'You must log in to continue'});
	}

	next();
};
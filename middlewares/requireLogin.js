module.exports = (req, res, next) => {
	if(false) { //TODO
		const httpError = createError(500, "You must log in top continue.");
		return next(httpError);
	}

	next();
};
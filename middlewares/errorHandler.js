const NODE_ENVIRONMENT = process.env.NODE_ENV || "dev";

function errorHandlerMiddleware(err, req, res, next) {
	const errorMessage = getErrorMessage(err);

	//todo any logging
	logErrorMessage(err);

	if(res.headerSent) {
		return next(err);
	}

	const errorResponse = {
		statusCode: getHttpStatusCode( {err, res }),
		body: undefined
	};

	if(NODE_ENVIRONMENT !== "prod") {
		errorResponse.body = errorMessage;
	}

	response.status(errorResponse.statusCode);

	response.format({
		"application/json": () => {
			response.json({message: errorResponse.body});
		},
		default: () => {
			response.type("text/plain").send(errorResponse.body);
		},
	});

	next();
}

function getErrorMessage(error) {
	if(error.stack) {
		return error.stack;
	}

	if(typeof error.toString === "function") {
		return error.toString();
	}

	return "";
}

//log to console, prob put analytics around it later if i care
function logErrorMessage(error) {
	console.log(error);
}

function isErrorStatusCode(statusCode) {
	return statusCode >= 400 && statusCode <= 500;
}

function getHttpStatusCode({ error, response}) {
	const statusCodeFromError = error.status || error.statusCode;
	if(isErrorStatusCode(statusCodeFromError)) {
		return statusCodeFromError;
	}

	const statusCodeFromResponse = response.statusCode;
	if(isErrorStatusCode(statusCodeFromResponse)) {
		return statusCodeFromResponse;
	}

	return 500;
}


module.exports = errorHandlerMiddleware;
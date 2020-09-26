//handler so as to get a neat error response instead of a jumbled up one
//a piece of middleware that will be used after its 404 handler
//json method is attached so that we can then return an object
//code of 500 means that something has gone wrong on the server
function errorHandler(error, request, response, next) {
  return response.status(error.status || 500).json({
    error: {
      message: error.message || "Oops! Something went wrong."
    }
  });
}

module.exports = errorHandler;

const errorHandler = (error, request, response, next) => {
    if (error.name === 'SequelizeValidationError') {
        return response.status(400).send({ error });
    }
    next(error);
};

module.exports = errorHandler
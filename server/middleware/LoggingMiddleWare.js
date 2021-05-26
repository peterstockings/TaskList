const logger = require('../libs/Logger')

module.exports = function (req, res, next) {
    let method = req.method;
    let url = req.url;
    let status = res.statusCode;
    
    logger.info(`${method} ${url}`);
    next();
};
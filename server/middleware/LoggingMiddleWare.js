const logger = require('../libs/Logger')

module.exports = function (req, res, next) {
    let method = req.method;
    let url = req.url;
    let status = res.statusCode;

    if (!url.includes('/socket.io')){
        logger.info(`${method} ${url}`);
    }
    
    next();
};
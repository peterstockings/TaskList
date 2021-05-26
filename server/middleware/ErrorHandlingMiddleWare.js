const logger = require('../libs/Logger')

module.exports = function(err, req, res, next){
    if (err) {
        let method = req.method;
        let url = req.url;

        logger.error(`${method} ${url} Error: ${err.message}`, {error: err.message});
    }

    return res.status(500).json({error: err.message});
}
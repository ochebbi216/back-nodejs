const jwt = require('jsonwebtoken');
const config = require("./database");

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, config.secret,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                else {
                    req._id = decoded._id;
                    next();
                }
            }
        )
    }
}
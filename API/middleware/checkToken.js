const jwt = require('jsonwebtoken');

// Check if token was provided and is valid.
// Create req.userID to be used by following middlewares or controllers.

const checkToken = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).send({ message: "Error. No token provided." });
    }

    jwt.verify(token, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Error. Invalid token.'});
        } else {
            req.userID = decodedToken.id;
            return next();
        }
    });
}

module.exports = checkToken;
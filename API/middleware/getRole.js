const db = require("../models");
const User = db.user;

// Get in the database the user's role.
// Always use checkToken middleware before, or req.userID won't be provided

const getRole = (req, res, next) => {
    User.findByPk(req.userID).then(user => {
        req.role = user.dataValues.role;
        next();
    })
}

module.exports = getRole;
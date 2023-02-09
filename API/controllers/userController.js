const db = require("../models");
require('dotenv').config();
const User = db.user;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
    if (req.body.password)
        var hash = bcrypt.hashSync(req.body.password, 10);

    User.create({
        username: req.body.username,
        password: hash,
        email: req.body.email,
    }).then(change => {
        res.status(200).json({ message: 'User created successfully.' });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}

exports.login = (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: "Missing field(s)." })
    }
    // Check if Username exists
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        // Check password
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({ message: "Invalid password." });
        }
        // Create token
        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET, { expiresIn: '3 hours' });
        // Send token
        res.status(200).json({ role: user.role, access_token: token });

    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}

exports.me = (req, res) => {
    User.findByPk(req.userID).then(user => {
        delete user.dataValues.password;
        res.status(200).json(user);
    });
}

exports.list = (req, res) => {
    User.findAll({
        attributes: ['id', 'username', 'role', 'email', 'createdAt', 'picture']
    }).then(users => {
        res.status(200).json(users);
    });
}

exports.info = (req, res) => {
    // Check for permissions
    if (req.userID !== parseInt(req.params.userID, 10) && req.role !== 'admin') {
        return res.status(403).json({ message: "Permission needed." });
    }
    // Retrieve infos
    User.findByPk(req.userID).then(user => {
        delete user.dataValues.password;
        res.status(200).json(user);
    });
}

exports.update = (req, res) => {
    // Check permissions
    if (req.userID !== parseInt(req.params.userID, 10) && req.role !== 'admin') {
        return res.status(403).json({ message: "Permission needed." });
    }
    // Hash password if provided
    if (req.body.password)
        var hash = bcrypt.hashSync(req.body.password, 10);
    // Update entry in database
    User.update({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        picture: req.body.picture
    }, {
        where: {
            id: parseInt(req.params.userID, 10)
        }
    }).then(change => {
        if (change[0] === 0) res.status(404).json({ message: "User not found." })
        else if (change[0] === 1) res.status(200).json({ message: "User updated successfully." })
    }).catch(err => {
        res.status(500).json({ message: err.message });
    })
}


exports.delete = (req, res) => {
    // Check permissions
    if (req.userID !== parseInt(req.params.userID, 10) && req.role !== 'admin') {
        return res.status(403).json({ message: "Permission needed." });
    }
    //Delete entry in database
    User.destroy({
        where: {
            id: parseInt(req.params.userID, 10)
        }
    }).then(change => {
        if (change === 0) res.status(404).json({ message: "User not found." })
        else if (change === 1) res.status(200).json({ message: "User deleted successfully." })
    }).catch(err => {
        res.status(500).json({ message: err.message });
    })
}

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                arg: true,
                msg: 'Username is already taken.'
            },
            validate: {
                notNull: {
                    msg: 'Must provide username.'
                },
                is: {
                    args: /\w/i,
                    msg: 'Username can only contain alphanumerical characters and underscores.'
                },
                len: {
                    args: [4, 20],
                    msg: 'Username must be between 4 and 20 characters.'
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Must provide password.'
                },
                notEmpty: {
                    msg: 'Password cannot be empty.'
                }
            }
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: "user"
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                arg: true,
                msg: 'Email is already taken'
            },
            validate: {
                isEmail: {
                    msg: 'Invalid email.'
                },
                notNull: {
                    msg: 'Must provide email.'
                },
                notEmpty: {
                    msg: 'Email cannot be empty.'
                }
            }
        },
        picture: {
            type : Sequelize.STRING
        }
    })

    return User;
}

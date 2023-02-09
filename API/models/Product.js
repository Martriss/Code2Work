module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Must provide product name.'
                },
                notEmpty: {
                    msg: 'Product name cannot be empty.'
                }
            }
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Must provide price.'
                },
                notEmpty: {
                    msg: 'Price cannot be empty.'
                },
                isDecimal: {
                    msg: 'Price must be a number.'
                }
            }
        },
        description: {
            type: Sequelize.STRING(500),
            validate: {
                max: {
                    args: 500,
                    msg: 'Description must be 500 or less characters.'
                }
            }
        },
        quality: {
            type: Sequelize.INTEGER(1)
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        image: {
            type: Sequelize.STRING
        }
    })

    return Product;
}

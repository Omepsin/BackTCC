const sequelize = require('sequelize')

const connection = new sequelize('dbcafe', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection
const sequelize = require("sequelize")
const connection = require("../database/database")

const UserModel = connection.define('users', {
    nome: {
        type: sequelize.TEXT,
        allowNull: false
    },

    cpf: {
        type: sequelize.STRING(11),
        allowNull: false
    },

    cel: {
        type: sequelize.STRING(12),
        allowNull: false
    },

    rua: {
        type: sequelize.TEXT,
        allowNull: false
    },

    cidade: {
        type: sequelize.TEXT,
        allowNull: false
    },

    uf: {
        type: sequelize.STRING(2),
        allowNull: false
    },

    num:{
        type: sequelize.INTEGER,
        allowNull: false
    },

    cep:{
        type: sequelize.STRING(9),
        allowNull: false
    },

    email:{
        type: sequelize.TEXT,
        allowNull: false
    },

    senha:{
        type: sequelize.TEXT,
        allowNull: false
    }
})

// UserModel.sync({force: true})
module.exports = UserModel

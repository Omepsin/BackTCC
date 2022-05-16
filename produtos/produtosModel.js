const sequelize = require("sequelize")
const connection = require("../database/database")

const ProdutosModel = connection.define("produtos", {
    nome: {
        type: sequelize.STRING,
        allowNull: false
    },

    preco:{
        type: sequelize.DECIMAL,
        allowNull: false
    },

    imagem:{
        type: sequelize.BLOB,
        allowNull: false
    }
})

// ProdutosModel.sync({force: true})
module.exports = ProdutosModel
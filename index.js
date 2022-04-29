const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const session = require("express-session")

const userController = require("./user/userController")
const userModel = require("./user/userModel")

const funcController = require("./funcionarios/funcController")
const funcModel = require("./funcionarios/funcModel")

connection
    .authenticate()
        .then(() =>{
            console.log("Conexão com BD feita!")
        })
        .catch((err) => {
            console.log(err)
        })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({
    secret: "palavra",
    cookie: { maxAge: 30000 }
}))
app.use("/", userController)
app.use("/", funcController)

app.get("/", (req, res) =>{
    res.render("sla")
})

app.listen(3660, function(erro){
    if(erro)
        console.log("Erro ao inicializar o servidor")

    else
        console.log("Servidor inicializado com sucesso")
})
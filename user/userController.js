const express = require("express")
const router = express.Router()
const Users = require("./userModel")
const bcrypt = require("bcryptjs")

router.get("/cadastrar", (req, res) => {
    res.render("cadastrar")
})

router.post("/users/create", (req, res) => {
    var nome = req.body.nome
    var cpf = req.body.cpf
    var cel = req.body.cel
    var rua = req.body.rua
    var cidade = req.body.cidade
    var uf = req.body.uf
    var num = req.body.num
    var cep = req.body.cep
    var email = req.body.email
    var senha = req.body.senha

    Users.findOne({where:{email: email}}).then(user => {
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(senha, salt)

            Users.create({
                nome: nome,
                cpf: cpf,
                cel: cel,
                rua: rua,
                cidade: cidade,
                uf: uf,
                num: num,
                cep: cep,
                email: email,
                senha: hash
            }).then(() => {
                res.redirect("/")
            }).catch((err) => {
                console.log("err")
            })

        }else{
            res.redirect("/cadastrar")
        }
    })    
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/authenticate", (req, res) =>{
    var email = req.body.email
    var senha = req.body.senha

    Users.findOne({where:{email: email}}).then(user => {
        if(user != undefined){
            var correct = bcrypt.compareSync(senha, user.senha)

            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/")
            }else{
                console.log("Email ou senha incorretos!")
                res.redirect("/login")
            }
        }else{
            console.log("Usuário não cadastrado!")
            res.redirect("/login")
        }
    })
})
module.exports = router
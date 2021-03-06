const express = require("express")
const router = express.Router()
const Func = require("./funcModel")
const bcrypt = require("bcryptjs")

router.get("/dash/func", (req, res) => {
    Func.findAll().then(funcionarios =>{
        res.render("func-dash", {funcionarios: funcionarios})
    })
})

router.get("/func/cadastrar", (req, res) => {
    res.render("func-cadastrar")
})

router.post("/func/create", (req, res) => {
    const nome = req.body.nome
    const cpf = req.body.cpf
    const salario = req.body.salario
    const cel = req.body.cel
    const rua = req.body.rua
    const cidade = req.body.cidade
    const uf = req.body.uf
    const num = req.body.num
    const cep = req.body.cep
    const email = req.body.email
    const senha = req.body.senha

    Func.findOne({where:{email: email}}).then(funcionarios => {
        if(funcionarios == undefined){
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(senha, salt)

            Func.create({
                nome: nome,
                cpf: cpf,
                salario: salario,
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
                console.log(err)
            })

        }else{
            res.redirect("/func/cadastrar")
        }
    })    
})

router.get("/func/login", (req, res) => {
    res.render("func-login")
})

router.post("/funcauthenticate", (req, res) =>{
    const email = req.body.email
    const senha = req.body.senha

    Func.findOne({where:{email: email}}).then(funcionarios => {
        if(funcionarios != undefined){
            const correct = bcrypt.compareSync(senha, funcionarios.senha)

            if(correct){
                req.session.funcionarios = {
                    id: funcionarios.id,
                    email: funcionarios.email
                }
                res.redirect("/")
            }else{
                res.redirect("/func/login")
            }
        }else{
            res.redirect("/func/login")
        }
    })
})
module.exports = router
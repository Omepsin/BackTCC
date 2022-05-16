const express = require("express")
const router = express.Router()
const Produto = require("./produtosModel")

router.get("/produtos", (req, res) => {
    Produto.findAll().then(produtos => {
        res.render("produtos", { produtos: produtos })
    })
})

router.get("/cadastrar/produto", (req, res) => {
    res.render("cadastrar-prod")
})

router.post("/prod/cad", (req, res) => {
    const nome = req.body.nome
    const preco = req.body.preco
    const imagem = req.body.imagem

    Produto.create({
        nome: nome,
        preco: preco,
        imagem: imagem
    })

    res.redirect("/produtos")
})

router.post("/deletar/produto", (req, res) => {
    let id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Produto.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/produtos")
            })
        } else {
            res.redirect("/b")
        }
    } else {
        res.redirect("/b")
    }
})

router.get("/edit/produtos/:id", (req, res) => {
    let id = req.params.id

    if (isNaN(id)) {
        res.redirect("/produtos")
    }

    Produto.findByPk(id).then(produtos => {
        if (produtos != undefined) {
            res.render("editProd", { produtos: produtos })
        } else {
            res.redirect("/produtos")
        }
    }).catch(erro => {
        res.redirect("/produtos")
    })
})

router.post("/edit/update", (req, res) => {
    let id = req.body.id
    const nome = req.body.nome
    const preco = req.body.preco
    const imagem = req.body.imagem

    Produto.update({
        nome: nome,
        preco: preco,
        imagem: imagem
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/produtos")
    })
})
module.exports = router
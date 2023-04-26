const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")

app.engine("handlebars", handlebars({defaultLayout:"main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended:false}))
app.set(bodyParser.json())

app.get("/",function(req,res){
    res.render("primeira_pagina")
})

app.get("/consultar",function(req,res){
    post.findAll().then(function(post){
        res.render("consultar", {post})    
    }).catch(function(erro){
        console.log("Erro ao carregar "+erro)
    })
    
})

app.get("/excluir/:id",function(req,res){
    post.destroy({
        where: {
          id: req.params.id
        },
        force: true
      }).then(function(){
        res.redirect("/consultar")
    }).catch(function(erro){
        console.log("Erro ao deletar "+erro)
    })
})

app.get("/atualizar/:id",function(req,res){
    post.findAll().then(function(post){
        res.render("atualizar", {post})    
    }).catch(function(erro){
        console.log("Erro ao carregar "+erro)
    })
})

app.post("/cadastrar",function(req,res){
    post.create({
        nome: req.body.nome,
        telefone:req.body.telefone,
        origem:req.body.origem, 
        data:req.body.data,
        observacao:req.body.obs
    }).then(function(){
        res.redirect("/")
    }).catch(function(erro){
        res.send("Erro "+erro)
    })
})


app.listen(8081,function(){
    console.log("Servidor ativo! ")
})

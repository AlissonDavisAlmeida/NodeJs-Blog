const express = require("express");

const rotas = express.Router();

rotas.get("/artigos", (req, res) => {
	res.send("<h1>Rota de Artigos</h1>");
});

rotas.get("/admin/artigos/new", (req, res) => {
	res.render("admin/artigos/new");
});


module.exports = rotas;

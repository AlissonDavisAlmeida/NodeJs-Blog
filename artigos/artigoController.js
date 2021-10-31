const express = require("express");

const rotas = express.Router();

rotas.get("/artigos", (req, res) => {
	res.send("<h1>Rota de Artigos</h1>");
});

rotas.get("/admin/artigos/new", (req, res) => {
	res.send("Rota para criar artigos");
});


module.exports = rotas;

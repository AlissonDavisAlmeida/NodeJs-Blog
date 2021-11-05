/* eslint-disable prefer-destructuring */
const express = require("express");
const { default: slugify } = require("slugify");
const Slug = require("slugify");
const Categorias = require("../categorias/Categoria");
const Artigos = require("./Artigo");

const rotas = express.Router();

rotas.get("/artigos", (req, res) => {
	res.send("<h1>Rota de Artigos</h1>");
});

rotas.get("/admin/artigos/new", (req, res) => {
	Categorias.findAll().then((categoria) => {
		res.render("admin/artigos/new", { categoria });
	});
});

rotas.post("/artigos/save", (req, res) => {
	const titulo = req.body.titulo;
	const artigo = req.body.artigo;
	const categoria = req.body.category;

	Artigos.create({
		titulo,
		slug: slugify(titulo),
		body: artigo,
		categoriumId: categoria,
	}).then(() => {
		res.redirect("/admin/categorias");
	});
});

module.exports = rotas;

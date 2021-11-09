/* eslint-disable prefer-destructuring */
const express = require("express");
const { default: slugify } = require("slugify");
const Slug = require("slugify");
const Categorias = require("../categorias/Categoria");
const Artigos = require("./Artigo");
const database = require("../database/database");

const rotas = express.Router();

rotas.get("/admin/artigos", (req, res) => {
	Artigos.findAll({
		include: [{ model: Categorias }],
	}).then((artigos) => {
		res.render("admin/artigos/index", { artigos });
	});
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
		res.redirect("/admin/artigos");
	});
});

rotas.post("/artigos/delete", (req, res) => {
	const id = req.body.id;
	if (id != undefined) {
		if (!isNaN(id)) {
			Artigos.destroy({
				where: {
					id,
				},
			}).then(() => {
				res.redirect("/admin/artigos");
			});
		} else {
			res.redirect("#");
		}
	} else {
		res.redirect("#");
	}
});


module.exports = rotas;

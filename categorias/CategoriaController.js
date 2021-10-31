/* eslint-disable no-var */
/* eslint-disable prefer-destructuring */
const express = require("express");
const slugify = require("slugify");

const rotas = express.Router();
const Categoria = require("./Categoria");

rotas.get("/admin/categorias/new", (req, res) => {
	res.render("../views/admin/categorias/new");
});

rotas.post("/categorias/save", (req, res) => {
	var titulo = req.body.titulo;

	if (titulo != undefined) {
		Categoria.create({
			titulo,
			slug: slugify(titulo),
		}).then(() => {
			res.redirect("/admin/categorias");
		});
	} else {
		res.redirect("/admin/categorias/new");
	}
});

rotas.get("/admin/categorias", (req, res) => {
	Categoria.findAll().then((categorias) => {
		res.render("admin/categorias/index", { categorias });
	});
});

module.exports = rotas;

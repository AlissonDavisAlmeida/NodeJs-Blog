/* eslint-disable prefer-destructuring */
const express = require("express");
const { default: slugify } = require("slugify");
const Slug = require("slugify");
const Categorias = require("../categorias/Categoria");
const Artigos = require("./Artigo");
const database = require("../database/database");
const authMiddleware = require("../middleware/adminAuth");

const rotas = express.Router();

rotas.get("/admin/artigos", authMiddleware, (req, res) => {
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

rotas.get("/admin/artigos/edit/:id", (req, res) => {
	const id = parseInt(req.params.id, 10);

	Artigos.findByPk(id).then((artigo) => {
		console.log(artigo);
		if (artigo != undefined) {
			Categorias.findAll().then((categoria) => {
				res.render("admin/artigos/edit", { artigo, categoria });
			});
		} else {
			res.redirect("/admin/artigos");
		}
	}).catch((erro) => {
		res.redirect("/admin/artigos");
	});
});

rotas.post("/artigos/update", (req, res) => {
	const id = req.body.id;
	const titulo = req.body.titulo;
	const artigo = req.body.artigo;
	const categoria = req.body.category;
	Artigos.update(
		{
			titulo, body: artigo, categoriumId: categoria, slug: slugify(titulo),
		}, {
			where: {
				id,
			},
		},
	).then(() => {
		res.redirect("/admin/artigos");
	}).catch((erro) => {
		res.redirect("/admin/artigos");
	});
});

rotas.get("/artigos/page/:numero", (req, res) => {
	const page = parseInt(req.params.numero, 10);
	Artigos.findAndCountAll({ limit: 1, offset: 1 * (page - 1) }).then((artigos) => {
		res.json(artigos);
	});
});

module.exports = rotas;

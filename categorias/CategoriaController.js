/* eslint-disable radix */
/* eslint-disable no-var */
/* eslint-disable prefer-destructuring */
const express = require("express");
const slugify = require("slugify");
const authMiddleware = require("../middleware/adminAuth");

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

rotas.get("/admin/categorias", authMiddleware, (req, res) => {
	Categoria.findAll().then((categorias) => {
		res.render("admin/categorias/index", { categorias });
	});
});

rotas.post("/categorias/delete", (req, res) => {
	var id = req.body.id;
	if (id != undefined) {
		if (!isNaN(id)) {
			Categoria.destroy({
				where: {
					id,
				},
			}).then(() => {
				res.redirect("/admin/categorias");
			});
		} else {
			res.redirect("#");
		}
	} else {
		res.redirect("#");
	}
});

rotas.get("/admin/categorias/edit/:id", (req, res) => {
	const id = parseInt(req.params.id);

	Categoria.findByPk(id).then((categoria) => {
		console.log(categoria);
		if (categoria != undefined) {
			res.render("admin/categorias/edit", { categoria });
		} else {
			res.redirect("/admin/categorias");
		}
	}).catch((erro) => {
		res.redirect("/admin/categorias");
	});
});

rotas.post("/categorias/update", (req, res) => {
	const id = req.body.id;
	const titulo = req.body.titulo;

	Categoria.update({ titulo, slug: slugify(titulo) }, {
		where: {
			id,
		},
	}).then(() => {
		res.redirect("/admin/categorias");
	});
});
module.exports = rotas;

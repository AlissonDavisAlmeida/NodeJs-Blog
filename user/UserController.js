const express = require("express");
const bcrypt = require("bcryptjs");

const rota = express.Router();

const Usuarios = require("./User");
const User = require("./User");

rota.get("/admin/users", (req, res) => {
	Usuarios.findAll().then((usuarios) => {
		res.render("admin/usuarios/index", { usuarios });
	});
});

rota.get("", (req, res) => {
	res.render("admin/usuarios/new");
});

rota.post("/users/create", (req, res) => {
	const { email } = req.body;

	const { senha } = req.body;
	const { nome } = req.body;


	User.findOne({
		where: {
			email,
		},
	}).then((usuario) => {
		if (usuario == undefined) {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(senha, salt);

			User.create({
				nome,
				email,
				senha: hash,

			}).then(() => {
				res.redirect("/admin/users");
			});
		} else {
			res.redirect("/");
		}
	});

	//res.json({ email, hash });
});

rota.get("/login", (req, res) => {
	res.render("admin/usuarios/login.ejs");
});

rota.post("/autenticado", (req, res) => {
	const { email } = req.body;
	const { senha } = req.body;

	User.findOne({
		where: {
			email,
		},
	}).then((usuario) => {
		if (bcrypt.compareSync(senha, usuario.senha)) {
			req.session.user = {
				id: usuario.id,
				email: usuario.email,
			};
			res.json(req.session.user);
		} else {
			res.redirect("/login");
		}
	});
});
module.exports = rota;


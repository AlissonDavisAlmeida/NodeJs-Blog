const express = require("express");

const rota = express.Router();

const Usuarios = require("./User");

rota.get("/admin/users", (req, res) => {
	res.send("Listagem de usuários");
});

rota.get("/admin/users/create", (req, res) => {
	res.render("../views/admin/usuarios/new");
});


module.exports = rota;


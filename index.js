/* eslint-disable prefer-destructuring */
const express = require("express");
const session = require("express-session");
const connection = require("./database/database");
const rotaArtigo = require("./artigos/artigoController");
const rotasCategorias = require("./categorias/CategoriaController");
const Categoria = require("./categorias/Categoria");
const rotaUser = require("./user/UserController");
const Artigo = require("./artigos/Artigo");
const User = require("./user/User");

connection.authenticate().then(() => {
	console.log("Conexão feita com sucesso");
}).catch((erro) => {
	console.log(`Erro: ${erro}`);
});

const app = express();

//View Engine
app.set("view engine", "ejs");

//Redis


//Sessões
app.use(session({
	secret: "alisqrodf",
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 30000000 },

}));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* app.get("/:slug", (req, res) => {
	const { slug } = req.params;
	Artigo.findOne({
		where: {
			slug,
		},
	}).then((artigo) => {
		Categoria.findAll().then((categoria) => {
			res.render("artigo", { artigo, categoria });
		});
	});
}); */

app.use(rotasCategorias);
app.use(rotaArtigo);
app.use(rotaUser);

app.get("/", (req, resp) => {
	Artigo.findAll().then((artigo) => {
		Categoria.findAll().then((categoria) => {
			console.log(artigo);
			resp.render("index", { artigo, categoria });
		});
	});
});

app.listen(3001, () => {
	console.log("O servidor está rodando");
});

app.get("/categoria/:slug", (req, res) => {
	const slug = req.params.slug;
	Categoria.findOne({
		where: {
			slug,

		},
		include: [{ model: Artigo }],
	}).then((categoria) => {
		Categoria.findAll().then((categorias) => {
			res.render("index", { artigos: categoria.artigos, categorias });
		});
	});
});

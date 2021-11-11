/* eslint-disable prefer-destructuring */
const express = require("express");
const connection = require("./database/database");
const rotaArtigo = require("./artigos/artigoController");
const rotasCategorias = require("./categorias/CategoriaController");
const Categoria = require("./categorias/Categoria");
const Artigo = require("./artigos/Artigo");

connection.authenticate().then(() => {
	console.log("Conexão feita com sucesso");
}).catch((erro) => {
	console.log(`Erro: ${erro}`);
});

const app = express();

//View Engine
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/:slug", (req, res) => {
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
});

app.use(rotasCategorias);
app.use(rotaArtigo);

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

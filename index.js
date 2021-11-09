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
		res.render("artigo", { artigo });
	});
});

app.use(rotasCategorias);
app.use(rotaArtigo);

app.get("/", (req, resp) => {
	resp.render("index");
});

app.listen(3001, () => {
	console.log("O servidor está rodando");
});

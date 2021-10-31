const Sequelize = require("sequelize");
const connection = require("../database/database");
const Categoria = require("../categorias/Categoria");


const Artigo = connection.define("artigo", {
	titulo: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	slug: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	body: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
});

Categoria.hasMany(Artigo);
Artigo.belongsTo(Categoria);

//Artigo.sync({ force: true });
module.exports = Artigo;

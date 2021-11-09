const Sequelize = require("sequelize");

const connection = new Sequelize("blog", "root", "mowmow21", {
	host: "localhost",
	dialect: "mysql",
	timezone: "-03:00",
});

module.exports = connection;

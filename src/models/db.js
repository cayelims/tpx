const Sequelize = require("sequelize");

	// Conexão com o Banco de Dados MySQL
	const sequelize = new Sequelize("u668533246_argentum", "u668533246_argentum", "ySRrZDNZDY4AgLfPreArCWxe18HU3g6rzNZORmnUBiWht2yc", {
		host: "srv1721.hstgr.io",
		dialect : 'mysql',
		port: '3306'
	});

module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize
}

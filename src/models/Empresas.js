const db = require('./db');

const Empresas = db.sequelize.define('tmp_empresas', {
	cnpj: {
		type: db.Sequelize.STRING,
		unique: true
	},
	name: {
		type: db.Sequelize.STRING,
		unique: true
	},
	contact: {
		type: db.Sequelize.STRING
	},
	whatsapp: {
		type: db.Sequelize.STRING,
		unique: true
	},
	email: {
		type: db.Sequelize.STRING
	},
	qtdVidas: {
		type: db.Sequelize.STRING
	},
	referal: {
		type: db.Sequelize.INTEGER
	}
});

//Empresas.sync({force: true});

module.exports = Empresas;
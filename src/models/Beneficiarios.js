const db = require('./db');

const Beneficiarios = db.sequelize.define('tmp_beneficiarios', {
	cpf: {
		type: db.Sequelize.STRING
	},
	data_nasc: {
		type: db.Sequelize.DATE
	},
	name: {
		type: db.Sequelize.STRING
	},
	empresa_cnpj: {
		type: db.Sequelize.STRING
	}
});

//Beneficiarios.sync({force: true});

module.exports = Beneficiarios;
const db = require('./db');

const InvoicesBeta = db.sequelize.define('invoices-beta', {
	token: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	cpf: {
		type: db.Sequelize.STRING,
		allowNull: false
  },
	client: {
		type: db.Sequelize.STRING,
		allowNull: false
  },  
	vendor: {
		type: db.Sequelize.STRING,
	},
	quantity: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	planId: {
		type: db.Sequelize.INTEGER,
		allowNull: false,
	},
	plan: {
		type: db.Sequelize.STRING,
		allowNull: false,
	},
	operator: {
		type: db.Sequelize.STRING,
		allowNull: false,
	},
	planValueA: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueE: {
		type: db.Sequelize.REAL,
		allowNull: false
	}

});

// InvoicesBeta.sync({force: true});

module.exports = InvoicesBeta;
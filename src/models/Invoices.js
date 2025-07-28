const db = require('./db');

const Invoices = db.sequelize.define('invoices', {
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
	vendor_data: {
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
	},
	planValueF1A: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF2A: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF3A: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF4A: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF5A: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF6A: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF7A: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF8A: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF9A: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF10A: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF1E: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF2E: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF3E: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF4E: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF5E: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF6E: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF7E: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF8E: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF9E: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	planValueF10E: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	qtyF1: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	qtyF2: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	qtyF3: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	qtyF4: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	qtyF5: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	qtyF6: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	qtyF7: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	qtyF8: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	qtyF9: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	qtyF10: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	highlight: {
		type: db.Sequelize.STRING,
	},

});

// Invoices.sync({force: true});

module.exports = Invoices;
const db = require('./db');

const Products = db.sequelize.define('products', {
	name: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	operator_id: {
		type: db.Sequelize.INTEGER,
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
	},
	product_type: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	coparticipation: {
		type: db.Sequelize.STRING,
		allowNull: true,
	},
	coparticipationExamples:{
		type: db.Sequelize.TEXT,
		allowNull: true,
	},
	entity: {
		type: db.Sequelize.STRING,
		allowNull: true
	},
	category:{
		type: db.Sequelize.STRING,
		allowNull: false
	},
	level:{
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	coverage:{
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	refund:{
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	refundExamples:{
		type: db.Sequelize.TEXT,
		allowNull: true,
	},
	additionalInformation:{
		type: db.Sequelize.TEXT,
		allowNull: true,
	},
	carency:{
		type: db.Sequelize.TEXT,
		allowNull: true,
	},
	minVidas:{
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	maxVidas:{
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	network:{
		type: db.Sequelize.TEXT,
		allowNull: true
	},
	cost_enf_1: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_enf_2: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_enf_3: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_enf_4: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_enf_5: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_enf_6: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_enf_7: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_enf_8: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_enf_9: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_enf_10: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_ap_1: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_ap_2: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_ap_3: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_ap_4: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_ap_5: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_ap_6: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_ap_7: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_ap_8: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_ap_9: {
		type: db.Sequelize.REAL,
		allowNull: false
	},
	cost_ap_10: {
		type: db.Sequelize.REAL,
		allowNull: false
	}

});

//Products.sync({force: true});

module.exports = Products;
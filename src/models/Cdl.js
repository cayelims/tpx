const db = require('./db');

const Cdl = db.sequelize.define('leads_cdl', {
	name: {
		type: db.Sequelize.STRING,
		allowNull: false
  },
  phone: {
    type: db.Sequelize.STRING
  },
  email: {
    type: db.Sequelize.STRING
  },
  enterprise_name: {
    type: db.Sequelize.STRING
  },
  site: {
    type: db.Sequelize.STRING
  },
  cnpj: {
    type: db.Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  modality:{
    type: db.Sequelize.STRING
  },
  status:{
    type: db.Sequelize.STRING
  },
  sector: {
    type: db.Sequelize.STRING
  },
  qtd_vidas: {
    type: db.Sequelize.STRING
  },
  partners: {
    type: db.Sequelize.STRING
  },
  notes: {
    type: db.Sequelize.STRING
  },
  owner: {
    type: db.Sequelize.STRING
  },
  returnIn: {
    type: db.Sequelize.STRING
  },
  question1: {
    type: db.Sequelize.STRING
  },
  question2: {
    type: db.Sequelize.STRING
  },
  question3: {
    type: db.Sequelize.STRING
  },
  question4: {
    type: db.Sequelize.JSON
  }

});

// Cdl.sync({force: true});

module.exports = Cdl;
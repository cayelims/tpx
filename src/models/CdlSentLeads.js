const db = require('./db');

const SentLeadsCdl = db.sequelize.define('sent_leads_cdl', {
	operator: {
		type: db.Sequelize.STRING,
		allowNull: false
  },
  lead_id: {
    type: db.Sequelize.INTEGER
  },
  status: {
		type: db.Sequelize.STRING,
		allowNull: false
  }

});

// SentLeadsCdl.sync({force: true});

module.exports = SentLeadsCdl;
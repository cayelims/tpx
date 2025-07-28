const db = require('./db');

const Notes = db.sequelize.define('notes', {
	operator: {
		type: db.Sequelize.STRING,
		allowNull: false
  },
  lead_id: {
    type: db.Sequelize.INTEGER
  },
  note: {
		type: db.Sequelize.STRING,
		allowNull: false
  }

});

// Notes.sync({force: true});

module.exports = Notes;
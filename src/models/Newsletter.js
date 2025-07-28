const db = require('./db');

const Newsletter = db.sequelize.define('newsletter', {
	email: {
		type: db.Sequelize.STRING,
		unique: true
	},
});

// Newsletter.sync({force: true});

module.exports = Newsletter;
const db = require('./db');

const Operators = db.sequelize.define('operators', {
	name: {
		type: db.Sequelize.STRING
	},
	products: {
		type: db.Sequelize.JSON
	}
});

//Operators.sync({force: true});

module.exports = Operators;
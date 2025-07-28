const express = require('express');
const router = express.Router();
const path = require('path');
const Operators = require('../models/Operators');

router.get('/operadoras', function(req, res){ // Rota main
	// res.send('Hello World')
	Operators.findAll({order: [['id', 'DESC']]}).then(function(operators){
		// res.render('home.handlebars', {operator: operators});
			return res.json({operators: operators});
	})
});

router.get('/operadoras/del/:id', function(req, res){
	Operators.destroy({where: {'id': req.params.id}}).then(function(){
		res.redirect('/');
	}).catch(function(erro){
		res.send('Houve um erro: ' + erro);
	});
});

router.get('/operadoras/cad', function(req, res){
	res.render('formulario.handlebars');
});

router.post('/operadoras/add', function(req, res){
	Operators.create({
		name: req.body.name,
		products: req.body.products
	}).then(function(){
		res.redirect('/operadoras');
	}).catch(function(erro){
		res.send('Houve um erro: ' + erro);
	});
});

module.exports = router
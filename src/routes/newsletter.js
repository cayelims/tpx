const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');
const { json } = require('body-parser');

router.get('/leads', function(req, res){ // Rota main
	Newsletter.findAll({order: [['id', 'DESC']]}).then(function(lead){
		return res.json({leads: lead});
	})
});

router.post('/newsletter/register', function(req, res){
	Newsletter.create({
		email: req.body.email,
	}).then(function(reserva){
		res.status(201).json({ message: 'Cadastro feito com sucesso.', code: 201});
	}).catch(function(erro){
		res.status(500).json({ message: 'Houve um erro', code: 500, error: erro});
	});
});

module.exports = router
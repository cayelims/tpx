const express = require('express');
const router = express.Router();
const Empresas = require('../models/Empresas');
const { json } = require('body-parser');

router.get('/mega_week', function(req, res){ // Rota main
	Empresas.findAll({order: [['id', 'DESC']]}).then(function(empresas){
		return res.json({products: empresas});
	})
});

router.post('/mega_week/reservation', function(req, res){
	Empresas.create({
		cnpj: req.body.cnpj,
		name: req.body.name,
		contact: req.body.contact,
		whatsapp: req.body.whatsapp,
		email: req.body.email,
		qtdVidas: req.body.qtdVidas,
		referal: req.body.referal
	}).then(function(reserva){
		res.send('Reserva feita com sucesso.');
	}).catch(function(erro){
		res.send('Houve um erro: ' + erro);
	});
});

module.exports = router
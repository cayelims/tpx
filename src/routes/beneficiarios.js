const express = require('express');
const router = express.Router();
const Beneficiarios = require('../models/Beneficiarios');
const { json } = require('body-parser');

router.get('/beneficiarios', function(req, res){ // Rota main
	Beneficiarios.findAll({order: [['id', 'DESC']]}).then(function(beneficiarios){
		return res.json({products: empresas});
	})
});

router.post('/beneficiarios/add', function(req, res){
	Beneficiarios.create({
		name: req.body.name,
		cpf: req.body.cpf,
		data_nasc: req.body.data_nasc,
		empresa_cnpj: req.body.empresa_cnpj
	}).then(function(beneficiario){
		res.status(201).send('Beneficiário salvo com sucesso.');
	}).catch(function(erro){
		res.send('Houve um erro: ' + erro);
	});
});

module.exports = router
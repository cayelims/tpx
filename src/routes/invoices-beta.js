const express = require('express');
const router = express.Router();
const Products = require('../models/Products');
const Invoices = require('../models/Invoices');
const { json } = require('body-parser');
const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');
const md5 = require('md5');

router.get('/invoice/:token', function(req, res){ // Rota main
	Invoices.findAll({
		where: {
			token: req.params.token,
		}
	}).then(function(invoice){
		return res.json({invoice: invoice});
	})
});

router.get('/invoices/:vendor/:cpf/:cliente/:planos/:faixa1/:faixa2/:faixa3/:faixa4/:faixa5/:faixa6/:faixa7/:faixa8/:faixa9/:faixa10/', (req, res) => {
	selectedPlans = req.params.planos;
	selectedPlans = selectedPlans.split(',');

	// Obtém a data/hora atual
	var data = new Date();

	var token = md5(data+req.params.cpf);

	const quantity = parseInt(req.params.faixa1) + parseInt(req.params.faixa2) + parseInt(req.params.faixa3) + parseInt(req.params.faixa4) + parseInt(req.params.faixa5) + parseInt(req.params.faixa6) + parseInt(req.params.faixa7) + parseInt(req.params.faixa8) +	parseInt(req.params.faixa9) +	parseInt(req.params.faixa10);

	const faixa1 = parseInt(req.params.faixa1);
	const faixa2 = parseInt(req.params.faixa2);
	const faixa3 = parseInt(req.params.faixa3);
	const faixa4 = parseInt(req.params.faixa4);
	const faixa5 = parseInt(req.params.faixa5);
	const faixa6 = parseInt(req.params.faixa6);
	const faixa7 = parseInt(req.params.faixa7);
	const faixa8 = parseInt(req.params.faixa8);
	const faixa9 = parseInt(req.params.faixa9);
	const faixa10 = parseInt(req.params.faixa10);

	var resposta = [];
	var plano = {};

	Products.findAll({
		where: {
			id: selectedPlans,
		}, order: [
			['cost_enf_1', 'ASC'],
			['cost_ap_1', 'ASC'],
			['operator_id', 'ASC'],
		]
		
	}).then(function(products){
		for(product in products){
			plano = {
				'id': products[product].id,
				'plan': products[product].name,
				'operator_id': products[product].operator_id,
				'totalEnfermaria': (
					products[product].cost_enf_1 * faixa1 +
					products[product].cost_enf_2 * faixa2 +
					products[product].cost_enf_3 * faixa3 +
					products[product].cost_enf_4 * faixa4 +
					products[product].cost_enf_5 * faixa5 +
					products[product].cost_enf_6 * faixa6 +
					products[product].cost_enf_7 * faixa7 +
					products[product].cost_enf_8 * faixa8 +
					products[product].cost_enf_9 * faixa9 +
					products[product].cost_enf_10 * faixa10
				),
				'totalApartamento': (
					products[product].cost_ap_1 * faixa1 +
					products[product].cost_ap_2 * faixa2 +
					products[product].cost_ap_3 * faixa3 +
					products[product].cost_ap_4 * faixa4 +
					products[product].cost_ap_5 * faixa5 +
					products[product].cost_ap_6 * faixa6 +
					products[product].cost_ap_7 * faixa7 +
					products[product].cost_ap_8 * faixa8 +
					products[product].cost_ap_9 * faixa9 +
					products[product].cost_ap_10 * faixa10
				),
			};
			resposta.push(plano);
    }
    
    resposta.map(function(item){
      planId = item.id;
      plan = item.plan;
      operator = item.operator_id;
      planValueA = item.totalApartamento;
      planValueE = item.totalEnfermaria;

      Invoices.create({
        token: token,
        cpf: req.params.cpf,
        client: req.params.cliente,
        vendor: req.params.vendor,
        quantity: quantity,
      
        planId: planId,
        plan: plan,
        operator: operator,
        planValueA: planValueA,
        planValueE: planValueE,
        
      }).then(function(invoice){
        console.log('Adicionado um novo plano ao registro de cotações');
      }).catch(function(erro){
        res.send('Houve um erro: ' + erro);
      });
    })
    
    var link = 'http://topprimeseguros.com.br/invoice/?token='+invoice.token;

		return res.json({
      link
    });
		
	});

});


module.exports = router
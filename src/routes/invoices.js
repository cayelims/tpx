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
		},order: [
			['planValueA', 'ASC'],
			['planValueE', 'ASC'],
		]
	}).then(function(invoice){
		return res.json({invoices: invoice});
	})
});

router.get('/invoices/:vendor/:vendor_data/:cpf/:cliente/:planos/:destaque/:faixa1/:faixa2/:faixa3/:faixa4/:faixa5/:faixa6/:faixa7/:faixa8/:faixa9/:faixa10/', (req, res) => {
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
	var destaques = req.params.destaque;
	destaques = destaques.split(',');

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
				'valorF1A': products[product].cost_ap_1 * faixa1,
				'valorF2A': products[product].cost_ap_2 * faixa2,
				'valorF3A': products[product].cost_ap_3 * faixa3,
				'valorF4A': products[product].cost_ap_4 * faixa4,
				'valorF5A': products[product].cost_ap_5 * faixa5,
				'valorF6A': products[product].cost_ap_6 * faixa6,
				'valorF7A': products[product].cost_ap_7 * faixa7,
				'valorF8A': products[product].cost_ap_8 * faixa8,
				'valorF9A': products[product].cost_ap_9 * faixa9,
				'valorF10A': products[product].cost_ap_10 * faixa10,
				'valorF1E': products[product].cost_enf_1 * faixa1,
				'valorF2E': products[product].cost_enf_2 * faixa2,
				'valorF3E': products[product].cost_enf_3 * faixa3,
				'valorF4E': products[product].cost_enf_4 * faixa4,
				'valorF5E': products[product].cost_enf_5 * faixa5,
				'valorF6E': products[product].cost_enf_6 * faixa6,
				'valorF7E': products[product].cost_enf_7 * faixa7,
				'valorF8E': products[product].cost_enf_8 * faixa8,
				'valorF9E': products[product].cost_enf_9 * faixa9,
				'valorF10E': products[product].cost_enf_10 * faixa10,
				
			};
			resposta.push(plano);
    }
    
    resposta.map(function(item){
	  var planHighlight;
	  destaques.map(function(destaque){
		var dest = destaque.split('-')
		if(dest[0] == item.id){
			planHighlight = dest[1];
		}
	  });

      planId = item.id;
      plan = item.plan;
      operator = item.operator_id;
      planValueA = item.totalApartamento;
      planValueE = item.totalEnfermaria;
      planValueF1A = item.valorF1A;
      planValueF2A = item.valorF2A;
      planValueF3A = item.valorF3A;
      planValueF4A = item.valorF4A;
      planValueF5A = item.valorF5A;
      planValueF6A = item.valorF6A;
      planValueF7A = item.valorF7A;
      planValueF8A = item.valorF8A;
      planValueF9A = item.valorF9A;
      planValueF10A = item.valorF10A;
      planValueF1E = item.valorF1E;
      planValueF2E = item.valorF2E;
      planValueF3E = item.valorF3E;
      planValueF4E = item.valorF4E;
      planValueF5E = item.valorF5E;
      planValueF6E = item.valorF6E;
      planValueF7E = item.valorF7E;
      planValueF8E = item.valorF8E;
      planValueF9E = item.valorF9E;
      planValueF10E = item.valorF10E;
	  qtyF1 = faixa1;
	  qtyF2 = faixa2;
	  qtyF3 = faixa3;
	  qtyF4 = faixa4;
	  qtyF5 = faixa5;
	  qtyF6 = faixa6;
	  qtyF7 = faixa7;
	  qtyF8 = faixa8;
	  qtyF9 = faixa9;
	  qtyF10 = faixa10;
	  highlight = planHighlight;

      Invoices.create({
        token: token,
        cpf: req.params.cpf,
        client: req.params.cliente,
        vendor: req.params.vendor,
        vendor_data: req.params.vendor_data,
        quantity: quantity,
        planId: planId,
        plan: plan,
        operator: operator,
        planValueA: planValueA,
        planValueE: planValueE,
        planValueF1A: planValueF1A,
        planValueF2A: planValueF2A,
        planValueF3A: planValueF3A,
        planValueF4A: planValueF4A,
        planValueF5A: planValueF5A,
        planValueF6A: planValueF6A,
        planValueF7A: planValueF7A,
        planValueF8A: planValueF8A,
        planValueF9A: planValueF9A,
        planValueF10A: planValueF10A,
        planValueF1E: planValueF1E,
        planValueF2E: planValueF2E,
        planValueF3E: planValueF3E,
        planValueF4E: planValueF4E,
        planValueF5E: planValueF5E,
        planValueF6E: planValueF6E,
        planValueF7E: planValueF7E,
        planValueF8E: planValueF8E,
        planValueF9E: planValueF9E,
        planValueF10E: planValueF10E,
		qtyF1: qtyF1,
		qtyF2: qtyF2,
		qtyF3: qtyF3,
		qtyF4: qtyF4,
		qtyF5: qtyF5,
		qtyF6: qtyF6,
		qtyF7: qtyF7,
		qtyF8: qtyF8,
		qtyF9: qtyF9,
		qtyF10: qtyF10,
		highlight:highlight
        
      }).then(function(){
        console.log('Adicionado um novo plano ao registro de cotações');
      }).catch(function(erro){
        res.send('Houve um erro: ' + erro);
      });
    })
    
    var link = 'http://topprimeseguros.com.br/invoice/?token='+token;

		return res.json({
      link
    });
		
	});

});


module.exports = router
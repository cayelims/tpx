const express = require('express');
const router = express.Router();
const Products = require('../models/Products');
const Sequelize = require("sequelize");

router.get('/planos', async (req, res) => { // Rota main
	await Products.findAll({order: [['id', 'DESC']]}).then((products) => {
		return res.json({ products });
	})
});

router.get('/plano/:id', async (req, res) => { // Rota main
	await Products.findAll({
		where: {
			id: req.params.id,
		},order: [
			['cost_ap_1', 'ASC'],
		]
	}).then((plan) => {
		return res.json({plan: plan});
	})
});

router.get('/adicionais/plano/:id', async (req, res) => { // Rota main
	await Products.findAll({
		where: {
			id: req.params.id,
		},order: [
			['cost_ap_1', 'ASC'],
		]
	}).then((plan) => {
		return res.json({plan: plan});
	})
});

router.get('/tabela-plano/:id', async (req, res) => { // Rota main
	await Products.findAll({
		where: {
			id: req.params.id,
		}
	}).then((plan) => {
		return res.json({
			'name': plan[0].name,
			'faixa1E': plan[0].cost_enf_1,
			'faixa2E': plan[0].cost_enf_2,
			'faixa3E': plan[0].cost_enf_3,
			'faixa4E': plan[0].cost_enf_4,
			'faixa5E': plan[0].cost_enf_5,
			'faixa6E': plan[0].cost_enf_6,
			'faixa7E': plan[0].cost_enf_7,
			'faixa8E': plan[0].cost_enf_8,
			'faixa9E': plan[0].cost_enf_9,
			'faixa10E': plan[0].cost_enf_10,
			'faixa1A': plan[0].cost_ap_1,
			'faixa2A': plan[0].cost_ap_2,
			'faixa3A': plan[0].cost_ap_3,
			'faixa4A': plan[0].cost_ap_4,
			'faixa5A': plan[0].cost_ap_5,
			'faixa6A': plan[0].cost_ap_6,
			'faixa7A': plan[0].cost_ap_7,
			'faixa8A': plan[0].cost_ap_8,
			'faixa9A': plan[0].cost_ap_9,
			'faixa10A': plan[0].cost_ap_10,
		});
	})
});

router.get('/cotacao/:category/:product_type/:faixa1/:faixa2/:faixa3/:faixa4/:faixa5/:faixa6/:faixa7/:faixa8/:faixa9/:faixa10/', async (req, res) => {
	const quantity = 
	parseInt(req.params.faixa1) +
	parseInt(req.params.faixa2) +
	parseInt(req.params.faixa3) +
	parseInt(req.params.faixa4) +
	parseInt(req.params.faixa5) +
	parseInt(req.params.faixa6) +
	parseInt(req.params.faixa7) +
	parseInt(req.params.faixa8) +
	parseInt(req.params.faixa9) +
	parseInt(req.params.faixa10);

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

	const Op = Sequelize.Op;

	await Products.findAll({
		where: {
			product_type: req.params.product_type,
			category: req.params.category,
			maxVidas: {
				[Op.gte]: quantity
			},
			minVidas: {
				[Op.lte]: quantity
			}
		},order: [
			['operator_id', 'ASC'],
			['cost_ap_1', 'ASC'],
		]
	}).then((products) => {
		var resposta = [];
		var plano = {};

		for(product in products){
			plano = {
				'id': products[product].id,
				'plan': products[product].name,
				'quantity': JSON.stringify(quantity),
				'coparticipation': products[product].coparticipation,
				'entity': products[product].entity,
				'level': products[product].level,
				'coverage': products[product].coverage,
				'refund': products[product].refund,
				'network': products[product].network,
				'operator': products[product].operator_id,
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
		return res.json({
			resposta
		});
	});
});

router.get('/cotacao-simples/:category/:product_type/:faixa1/:faixa2/:faixa3/:faixa4/:faixa5/:faixa6/:faixa7/:faixa8/:faixa9/:faixa10/', async (req, res) => {
	const quantity = 
	parseInt(req.params.faixa1) +
	parseInt(req.params.faixa2) +
	parseInt(req.params.faixa3) +
	parseInt(req.params.faixa4) +
	parseInt(req.params.faixa5) +
	parseInt(req.params.faixa6) +
	parseInt(req.params.faixa7) +
	parseInt(req.params.faixa8) +
	parseInt(req.params.faixa9) +
	parseInt(req.params.faixa10);

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

	const Op = Sequelize.Op;

	await Products.findAll({
		where: {
			product_type: req.params.product_type,
			category: req.params.category,
			maxVidas: {
				[Op.gte]: quantity
			},
			minVidas: {
				[Op.lte]: quantity
			}
		},
		group: ['operator_id'], 
		limit: 8, 
		order: [
			['cost_ap_1', 'ASC'],
			['cost_enf_1', 'ASC'],
			['operator_id', 'ASC'],
		]
	}).then((products) => {
		var resposta = [];
		var plano = {};

		for(product in products){
			plano = {
				'id': products[product].id,
				'plan': products[product].name,
				'quantity': JSON.stringify(quantity),
				'coparticipation': products[product].coparticipation,
				'entity': products[product].entity,
				'level': products[product].level,
				'coverage': products[product].coverage,
				'refund': products[product].refund,
				'network': products[product].network,
				'operator': products[product].operator_id,
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
		return res.json({
			resposta
		});
	});
});

router.get('/cotacao/:operadoras?/:category/:product_type/:faixa1/:faixa2/:faixa3/:faixa4/:faixa5/:faixa6/:faixa7/:faixa8/:faixa9/:faixa10/', async (req, res) => {

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

	var operadoras;

	if(req.params.operadoras){
		operadoras = req.params.operadoras;
		operadoras = operadoras.split(',');
	}

	const Op = Sequelize.Op;
	await Products.findAll({
		where: {
			product_type: req.params.product_type,
			category: req.params.category,
			operator_id: operadoras,
			maxVidas: {
				[Op.gte]: quantity
			},
			minVidas: {
				[Op.lte]: quantity
			}
		}, order: [
			['operator_id', 'ASC'],
			['cost_ap_1', 'ASC'],
		]
		
	}).then((products) => {
		for(product in products){
			plano = {
				'id': products[product].id,
				'plan': products[product].name,
				'quantity': JSON.stringify(quantity),
				'coparticipation': products[product].coparticipation,
				'entity': products[product].entity,
				'level': products[product].level,
				'coverage': products[product].coverage,
				'refund': products[product].refund,
				'network': products[product].network,
				'operator': products[product].operator_id,
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
		return res.json({
			resposta
		});
	});
});
router.get('/cotacao-simples/:operadoras?/:category/:product_type/:faixa1/:faixa2/:faixa3/:faixa4/:faixa5/:faixa6/:faixa7/:faixa8/:faixa9/:faixa10/', async (req, res) => {

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

	var operadoras;

	if(req.params.operadoras){
		operadoras = req.params.operadoras;
		operadoras = operadoras.split(',');
	}

	const Op = Sequelize.Op;
	await Products.findAll({
		where: {
			product_type: req.params.product_type,
			category: req.params.category,
			operator_id: operadoras,
			maxVidas: {
				[Op.gte]: quantity
			},
			minVidas: {
				[Op.lte]: quantity
			}
		},
		group: ['operator_id'], 
		limit: 8,  
		order: [
			['operator_id', 'ASC'],
			['cost_ap_1', 'ASC'],
		]
		
	}).then((products) => {
		for(product in products){
			plano = {
				'id': products[product].id,
				'plan': products[product].name,
				'quantity': JSON.stringify(quantity),
				'coparticipation': products[product].coparticipation,
				'entity': products[product].entity,
				'level': products[product].level,
				'coverage': products[product].coverage,
				'refund': products[product].refund,
				'network': products[product].network,
				'operator': products[product].operator_id,
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
		return res.json({
			resposta
		});
	});
});

router.get('/planos/del/:id', async (req, res) => {
	await Products.destroy({where: {'id': req.params.id}}).then(() => {
		res.redirect('/');
	}).catch((erro) => {
		res.send('Houve um erro: ' + erro);
	});
});

router.get('/comparativo/:planos/:faixa1/:faixa2/:faixa3/:faixa4/:faixa5/:faixa6/:faixa7/:faixa8/:faixa9/:faixa10/', async (req, res) => {
	selectedPlans = req.params.planos;
	selectedPlans = selectedPlans.split(',');

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

	await Products.findAll({
		where: {
			id: selectedPlans,
		}, order: [
			['cost_enf_1', 'ASC'],
			['cost_ap_1', 'ASC'],
			['operator_id', 'ASC'],
		]
		
	}).then((products) => {
		for(product in products){
			plano = {
				'id': products[product].id,
				'plan': products[product].name,
				'quantity': JSON.stringify(quantity),
				'coparticipation': products[product].coparticipation,
				'entity': products[product].entity,
				'level': products[product].level,
				'coverage': products[product].coverage,
				'carency': products[product].carency,
				'refund': products[product].refund,
				'network': products[product].network,
				'operator': products[product].operator_id,
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
		return res.json({
			resposta
		});
	});

});

router.post('/planos/add', async (req, res) => {
	await Products.create({
		name: req.body.name,
		operator_id: req.body.operator_id,
		product_type: req.body.product_type,
		coparticipation: req.body.coparticipation,
		coparticipationExamples: req.body.coparticipationExamples,
		entity: req.body.entity,
		category: req.body.category,
		level: req.body.level,
		coverage: req.body.coverage,
		refund: req.body.refund,
		refundExamples: req.body.refundExamples,
		additionalInformation: req.body.additionalInformation,
		carency: req.body.carency,
		minVidas: req.body.minVidas,
		maxVidas: req.body.maxVidas,
		network: req.body.network,
		cost_enf_1: req.body.cost_enf_1,
		cost_enf_2: req.body.cost_enf_2,
		cost_enf_3: req.body.cost_enf_3,
		cost_enf_4: req.body.cost_enf_4,
		cost_enf_5: req.body.cost_enf_5,
		cost_enf_6: req.body.cost_enf_6,
		cost_enf_7: req.body.cost_enf_7,
		cost_enf_8: req.body.cost_enf_8,
		cost_enf_9: req.body.cost_enf_9,
		cost_enf_10: req.body.cost_enf_10,
		cost_ap_1: req.body.cost_ap_1,
		cost_ap_2: req.body.cost_ap_2,
		cost_ap_3: req.body.cost_ap_3,
		cost_ap_4: req.body.cost_ap_4,
		cost_ap_5: req.body.cost_ap_5,
		cost_ap_6: req.body.cost_ap_6,
		cost_ap_7: req.body.cost_ap_7,
		cost_ap_8: req.body.cost_ap_8,
		cost_ap_9: req.body.cost_ap_9,
		cost_ap_10: req.body.cost_ap_10
	}).then((product) => {
		res.status(201).send('Plano criado com sucesso.');
	}).catch(function(erro){
		res.send('Houve um erro: ' + erro);
	});
});

router.post('/planos/edit', async (req, res) => {
	await Products.update({
		name: req.body.name,
		operator_id: req.body.operator_id,
		product_type: req.body.product_type,
		coparticipation: req.body.coparticipation,
		coparticipationExamples: req.body.coparticipationExamples,
		entity: req.body.entity,
		category: req.body.category,
		level: req.body.level,
		coverage: req.body.coverage,
		refund: req.body.refund,
		refundExamples: req.body.refundExamples,
		additionalInformation: req.body.additionalInformation,
		carency: req.body.carency,
		minVidas: req.body.minVidas,
		maxVidas: req.body.maxVidas,
		network: req.body.network,
		cost_enf_1: req.body.cost_enf_1,
		cost_enf_2: req.body.cost_enf_2,
		cost_enf_3: req.body.cost_enf_3,
		cost_enf_4: req.body.cost_enf_4,
		cost_enf_5: req.body.cost_enf_5,
		cost_enf_6: req.body.cost_enf_6,
		cost_enf_7: req.body.cost_enf_7,
		cost_enf_8: req.body.cost_enf_8,
		cost_enf_9: req.body.cost_enf_9,
		cost_enf_10: req.body.cost_enf_10,
		cost_ap_1: req.body.cost_ap_1,
		cost_ap_2: req.body.cost_ap_2,
		cost_ap_3: req.body.cost_ap_3,
		cost_ap_4: req.body.cost_ap_4,
		cost_ap_5: req.body.cost_ap_5,
		cost_ap_6: req.body.cost_ap_6,
		cost_ap_7: req.body.cost_ap_7,
		cost_ap_8: req.body.cost_ap_8,
		cost_ap_9: req.body.cost_ap_9,
		cost_ap_10: req.body.cost_ap_10
	},
	{
		where: {
			id: req.body.id
		}
	}
	
	).then((product) => {
		res.status(201).send('Plano criado com sucesso.');
	}).catch((erro) => {
		res.send('Houve um erro: ' + erro);
	});
});

router.get('/cotacao-site/:product_type', async (req, res) => {
	var resposta = [];
	var plano = {};

	for(c = 1; c < 8; c++){
		
		await Products.findAll({
			where: {
				product_type: req.params.product_type,
				operator_id: c
			},order: [
				['cost_ap_1', 'ASC'],
			],
			limit: 1
		}).then((products) => {
			
			for(product in products){
				plano = {
					'id': products[product].id,
					'plan': products[product].name,
					'coparticipation': products[product].coparticipation,
					'entity': products[product].entity,
					'level': products[product].level,
					'coverage': products[product].coverage,
					'refund': products[product].refund,
					'network': products[product].network,
					'operator': products[product].operator_id,
					'cost_enf_1': products[product].cost_enf_1,
					'cost_enf_2': products[product].cost_enf_2,
					'cost_enf_3': products[product].cost_enf_3,
					'cost_enf_4': products[product].cost_enf_4,
					'cost_enf_5': products[product].cost_enf_5,
					'cost_enf_6': products[product].cost_enf_6,
					'cost_enf_7': products[product].cost_enf_7,
					'cost_enf_8': products[product].cost_enf_8,
					'cost_enf_9': products[product].cost_enf_9,
					'cost_enf_10': products[product].cost_enf_10,
					'cost_ap_1': products[product].cost_ap_1,
					'cost_ap_2': products[product].cost_ap_2,
					'cost_ap_3': products[product].cost_ap_3,
					'cost_ap_4': products[product].cost_ap_4,
					'cost_ap_5': products[product].cost_ap_5,
					'cost_ap_6': products[product].cost_ap_6,
					'cost_ap_7': products[product].cost_ap_7,
					'cost_ap_8': products[product].cost_ap_8,
					'cost_ap_9': products[product].cost_ap_9,
					'cost_ap_10': products[product].cost_ap_10,
				};
				resposta.push(plano);
			}
			
		});

	}

	return res.json({
		resposta
	});
});

router.get('/cotacao-site-operadora/:product_type/:operator_id', async (req, res) => {
	var resposta = [];
	var plano = {};
		
	await Products.findAll({
		where: {
			product_type: req.params.product_type,
			operator_id: req.params.operator_id
		},order: [
			['cost_ap_1', 'ASC'],
		],
		limit: 1
	}).then((products) => {
		
		for(product in products){
			plano = {
				'id': products[product].id,
				'plan': products[product].name,
				'coparticipation': products[product].coparticipation,
				'entity': products[product].entity,
				'level': products[product].level,
				'coverage': products[product].coverage,
				'refund': products[product].refund,
				'network': products[product].network,
				'operator': products[product].operator_id,
				'cost_enf_1': products[product].cost_enf_1,
				'cost_enf_2': products[product].cost_enf_2,
				'cost_enf_3': products[product].cost_enf_3,
				'cost_enf_4': products[product].cost_enf_4,
				'cost_enf_5': products[product].cost_enf_5,
				'cost_enf_6': products[product].cost_enf_6,
				'cost_enf_7': products[product].cost_enf_7,
				'cost_enf_8': products[product].cost_enf_8,
				'cost_enf_9': products[product].cost_enf_9,
				'cost_enf_10': products[product].cost_enf_10,
				'cost_ap_1': products[product].cost_ap_1,
				'cost_ap_2': products[product].cost_ap_2,
				'cost_ap_3': products[product].cost_ap_3,
				'cost_ap_4': products[product].cost_ap_4,
				'cost_ap_5': products[product].cost_ap_5,
				'cost_ap_6': products[product].cost_ap_6,
				'cost_ap_7': products[product].cost_ap_7,
				'cost_ap_8': products[product].cost_ap_8,
				'cost_ap_9': products[product].cost_ap_9,
				'cost_ap_10': products[product].cost_ap_10,
			};
			resposta.push(plano);
		}
		
	});

	

	return res.json({
		resposta
	});
});

module.exports = router;
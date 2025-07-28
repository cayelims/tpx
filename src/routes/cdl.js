const express = require('express');
const routes = express.Router();
const Cdl = require('../models/Cdl');
const Sequelize = require("sequelize");
const CdlSentLeads = require('../models/CdlSentLeads');
const Notes = require('../models/Notes');

routes.post('/create-leads', async (req, res) => {
  const { name, phone, email, enterprise_name, site, cnpj, modality, status, sector, qtd_vidas, partners, notes, returnIn, question1, question2, question3, question4 } = req.body;
  
  await Leads.create({
    name,
    phone,
    email,
    enterprise_name,
    site,
    cnpj,
    modality,
    status,
    sector,
    qtd_vidas,
    partners,
    notes,
    returnIn,
    question1,
    question2,
    question3,
    question4
  }).then((lead) => {
    res.status(201).json({ lead })
  }).catch((erro) => {
    res.json({
      'erro': erro.errors[0].message,
      'field': erro.fields
    });
  });

});

routes.get('/get-leads', async (req, res) => {
  await Cdl.findAll({order: [['id', 'DESC']]}).then((leads) => {
    return res.json({ leads });
  });
});

routes.get('/get-leads-history/:owner', async (req, res) => {
  var owner = req.params.owner;
  await Cdl.findAll( {
    where: { owner, status: 'fechada', status: 'enviada' }	
  },{order: [['id', 'DESC']]} ).then((leads) => {
    return res.json({ leads });
  });
});

routes.get('/get-lead/:id', async (req, res) => {
  var id = req.params.id;
  await Cdl.findAll({
    where: { id }	
  }).then((lead) => {
    res.status(200).json({ lead })
  });
});

routes.post('/update-leads', async (req, res) => {
  const { id, name, phone, email, enterprise_name, site, cnpj, modality, status, sector, qtd_vidas, partners, notes, owner, returnIn, question1, question2, question3, question4 } = req.body;
  await Cdl.update({
    name,
    phone,
    email,
    enterprise_name,
    site,
    cnpj,
    modality,
    status,
    sector,
    qtd_vidas,
    partners,
    notes,
    owner,
    returnIn,
    question1,
    question2,
    question3,
    question4
  },
	{ where: { id }	}).then((lead) => {
    res.status(200).json({ lead })
  }).catch((erro) => {
    res.json({
      'erro': erro
    });
  })
});

routes.get('/del-leads/:id', async (req, res) => {
  await Cdl.destroy({where: {'id': req.params.id}}).then((lead) => {
    res.status(200).json({ lead })
  }).catch((erro) => {
		res.json({
      'erro': erro
    });
	});
}); 

routes.post('/add-sent-lead', async (req, res) => {
  const { operator, lead_id, status } = req.body;
  
  await CdlSentLeads.create({
    operator,
    lead_id,
    status
  }).then((lead) => {
    res.status(201).json({ lead })
  }).catch((erro) => {
    res.json({
      'erro': erro.errors[0].message,
      'field': erro.fields
    });
  });
});

routes.get('/get-sent-leads', async (req, res) => {
  await CdlSentLeads.findAll({order: [['id', 'DESC']]}).then((leads) => {
    return res.json({ leads });
  });
});

routes.get('/get-sent-leads-operator/:id', async (req, res) => {
  var operator = req.params.id
  await CdlSentLeads.findAll({
    where: { operator }	},{
    order: [['id', 'DESC']]  
  }).then((leads) => {
    return res.json({ leads });
  });
});

routes.get('/get-status-lead-operator/:id', async (req, res) => {
  var owner = req.params.id
  await Cdl.findAll({
    where: { owner }	},{
    order: [['id', 'DESC']]  
  }).then((leads) => {
    return res.json({ leads });
  });
});

routes.get('/get-status-lead/', async (req, res) => {
  await Cdl.findAll({
    order: [['id', 'DESC']]  
  }).then((leads) => {
    return res.json({ leads });
  });
});

routes.post('/add-notes/', async (req, res) => {
  const { operator, lead_id, note } = req.body;
  
  await Notes.create({
    operator,
    lead_id,
    note
  }).then((note) => {
    res.status(201).json({ note })
  }).catch((erro) => {
    res.json({
      'erro': erro.errors[0].message,
      'field': erro.fields
    });
  });
});

routes.get('/get-notes/:lead', async (req, res) => {
  var lead = req.params.lead;
  await Notes.findAll({where: { lead_id: lead }},{order: [['id', 'DESC']]}).then((notes) => {
    return res.json({ notes });
  });
});

module.exports = routes;
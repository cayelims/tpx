const { Router } = require('express');
const routes = new Router();

//importação
const beneficiariosRoute = require('./beneficiarios');
const cdlRoute = require('./cdl');
const empresasRoute = require('./empresas');
const homeRoute = require('./home');
const invoicesRoute = require('./invoices');
const invoicesBetaRoute = require('./invoices-beta');
const newsletterRoute = require('./newsletter');
const operatorsRoute = require('./operators');
const productsRoute = require('./products');

// rotas
routes.use('/beneficiarios', beneficiariosRoute);
routes.use('/cdl', cdlRoute);
routes.use('/empresas', empresasRoute);
routes.use('/home', homeRoute);
routes.use('/invoices', invoicesRoute);
routes.use('/invoices-beta', invoicesBetaRoute);
routes.use('/newsletter', newsletterRoute);
routes.use('/operators', operatorsRoute);
routes.use('/products', productsRoute);

// Exporta o roteador todas as rotas conectadas
module.exports = routes;
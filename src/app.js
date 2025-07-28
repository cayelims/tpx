const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const operatorsRoute = require('./routes/operators');
const productsRoute = require('./routes/products');

const empresasRoute = require('./routes/empresas');
const beneficiariosRoute = require('./routes/beneficiarios');

const invoicesRoute = require('./routes/invoices');

const newsletterRoute = require('./routes/newsletter');

const cdlRoute = require('./routes/cdl');

const homeRoute = require('./routes/home');
const cors = require('cors')

// Config
// Template Engine - 
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', handlebars);

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    app.use(cors());
    next();
});
app.use(operatorsRoute);
app.use(productsRoute);
app.use(empresasRoute);
app.use(beneficiariosRoute);
app.use(invoicesRoute);
app.use(homeRoute);
app.use(newsletterRoute);
app.use(cdlRoute);

app.get('/status', (req, res) => {
    var data = {
        status: true
    }
    res.json(data.status);
});

app.listen(process.env.PORT || 3000, '0.0.0.0', console.log('Project Argentum Started!')); //localhost:3000
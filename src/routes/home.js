const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
	res.send({
		"name": "argentum",
		"version": "0.0.1",
		"author": "Nexus NX"
		})
});

module.exports = router;
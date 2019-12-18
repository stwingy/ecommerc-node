const express = require('express');
const router = express.Router();
const productsRepo = require('../../repositorys/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');
const { check, validationResult } = require('express-validator');
router.get('/admin/products', (req, res) => {
	res.send('PRPDS');
});
router.get('/admin/products/new', (req, res) => {
	res.send(productsNewTemplate({}));
});
router.post('/admin/products/new', [ requireTitle, requirePrice ], (req, res) => {
	const errors = validationResult(req);
	console.log(errors, req.body);
	res.send('SUBMITTED');
});

module.exports = router;

const express = require('express');
const { check, validationResult } = require('express-validator');
const multer = require('multer');

const productsRepo = require('../../repositorys/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', (req, res) => {
	res.send('PRPDS');
});
router.get('/admin/products/new', (req, res) => {
	res.send(productsNewTemplate({}));
});
router.post('/admin/products/new', [ requireTitle, requirePrice ], upload.single('image'), (req, res) => {
	const errors = validationResult(req);
	console.log(req.file);
	res.send('SUBMITTED');
});

module.exports = router;

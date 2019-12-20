const express = require('express');
const multer = require('multer');

const productsRepo = require('../../repositorys/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');
const { handleErrors } = require('./middlewares');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', (req, res) => {
	res.send('PRPDS');
});
router.get('/admin/products/new', (req, res) => {
	res.send(productsNewTemplate({}));
});
router.post(
	'/admin/products/new',
	upload.single('image'),
	[ requireTitle, requirePrice ],
	handleErrors(productsNewTemplate),
	async (req, res) => {
		console.log(req.body);
		console.log(req.file);
		const image = req.file.buffer.toString('base64');
		const { title, price } = req.body;
		await productsRepo.create({ title, price, image });
		res.send('SUBMITTED');
	}
);

module.exports = router;

const express = require('express');
const cartsRepo = require('../repositorys/carts');
const productsRepo = require('../repositorys/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

router.post('/cart/products', async (req, res) => {
	//console.log(req.body.hiddenProductId);
	let cart;
	if (!req.session.cartId) {
		cart = await cartsRepo.create({ items: [] });
		req.session.cartId = cart.id;
	} else {
		cart = await cartsRepo.getOne(req.session.cartId);
	}
	const existingItem = cart.items.find((item) => item.id === req.body.hiddenProductId);
	if (existingItem) {
		existingItem.quantity++;
	} else {
		cart.items.push({ id: req.body.hiddenProductId, quantity: 1 });
	}
	await cartsRepo.update(cart.id, { items: cart.items });
	//console.log(cart);
	res.send('Added product to cart');
});

router.get('/cart', async (req, res) => {
	if (!req.session.cartId) {
		return res.redirect('/');
	}
	const cart = await cartsRepo.getOne(req.session.cartId);

	for (let item of cart.items) {
		const product = await productsRepo.getOne(item.id);
		item.product = product;
	}
	res.send(cartShowTemplate({ items: cart.items }));
});
module.exports = router;

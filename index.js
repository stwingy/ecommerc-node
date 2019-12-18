const express = require('express');

const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const productsRouter = require('./routes/admin/products');
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: [ 'qwerty12345!£$%^&*' ] //used to encrpt cookie
	})
);
app.use(authRouter);
app.use(productsRouter);
app.listen(3000, () => console.log('LISTENING'));

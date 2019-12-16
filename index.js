const express = require('express');

const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: [ 'qwerty12345!£$%^&*' ] //used to encrpt cookie
	})
);
app.use(authRouter);
app.listen(3000, () => console.log('LISTENING'));

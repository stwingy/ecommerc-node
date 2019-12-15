const express = require('express');
const usersRepo = require('./repositorys/users');
const cookieSession = require('cookie-session');
//const bodyParser = require('body-parser');
const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());
app.use(
	cookieSession({
		keys: [ 'qwerty12345!£$%^&*' ] //used to encrpt cookie
	})
);
app.get('/signup', (req, res) => {
	res.send(`<h1 style="color:red">HUKO</h1>
	id is ${req.session.userId}
	<p class ="pppp">hello to the world</p>
	<div>
	<form method ="POST">
	<input name = "email" type = "email" placeholder="Enter your email" />
	<input name = "password" type = "password" placeholder="Enter your password" />
	<input name = "passwordConfirmation" type = "password" placeholder="Confirm Password" />
	<button type = "submit">Submit</button>
	</form>
	</div>
	`);
});

app.post('/signup', async (req, res) => {
	const { email, password, passwordConfirmation } = req.body;
	const existingUser = await usersRepo.getOneBy({ email });
	if (existingUser) {
		return res.send('Email already in use');
	}
	if (password !== passwordConfirmation) {
		res.send('Passwords must match');
	}
	const user = await usersRepo.create({ email, password }); //id returned for cookie
	req.session.userId = user.id; //req.session is a cookie-sessio object -can add anything to it
	res.send('Suucess');
});
app.get('/signout', (req, res) => {
	req.session = null;
	res.send('You are logged out');
});
app.get('/signin', (req, res) => {
	res.send(`
	<div>
	<form method ="POST">
	<input name = "email" type = "email" placeholder="Enter your email" />
	<input name = "password" type = "password" placeholder="Enter your password" />
	
	<button type = "submit">Sign in</button>
	</form>
	</div>
	`);
});
app.post('/signin', async (req, res) => {
	const { email, password } = req.body;
	const user = await usersRepo.getOneBy({ email });
	if (!user) {
		return res.send('Email not found');
	}
	if (user.password !== password) {
		return res.send('Invalid password');
	}
	req.session.userId = user.id;
	res.send('You are signed in');
});
app.listen(3000, () => console.log('LISTENING'));

const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
const usersRepo = require('./repositorys/users');
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());
app.get('/', (req, res) => {
	res.send(`<h1 style="color:red">HUKO</h1>
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

app.post('/', async (req, res) => {
	const { email, password, passwordConfirmation } = req.body;
	const existingUser = await usersRepo.getOneBy({ email });
	if (existingUser) {
		return res.send('Email already in use');
	}
	if (password !== passwordConfirmation) {
		res.send('Passwords must match');
	}
	res.send('Suucess');
});
app.listen(3000, () => console.log('LISTENING'));

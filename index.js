const express = require('express');
const bodyParser = require('body-parser');
const app = express();
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

app.post('/', (req, res) => {
	res.send('Suucess');
});
app.listen(3000, () => console.log('LISTENING'));

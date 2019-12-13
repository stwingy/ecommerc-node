const express = require('express');

const app = express();
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
	req.on('data', (data) => {
		const parsed = data.toString('utf8').split('&');
		const formData = {};
		for (let pair of parsed) {
			const [ key, value ] = pair.split('=');
			formData[key] = value;
		}
		console.log(formData);
	});
	res.send('Suucess');
});
app.listen(3000, () => console.log('LISTENING'));

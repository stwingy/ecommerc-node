const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');
const scrypt = util.promisify(crypto.scrypt);
class usersRepository extends Repository {
	async create(attrs) {
		attrs.id = this.randomId();
		const salt = crypto.randomBytes(8).toString('hex');
		//hash the password +salt
		const buf = await scrypt(attrs.password, salt, 64);

		const records = await this.getAll();
		const record = { ...attrs, password: `${buf.toString('hex')}.${salt}` };
		records.push(record);

		await this.writeAll(records);
		return record;
	}
	async comparePasswords(saved, supplied) {
		const result = saved.split('.');
		const [ hashed, salt ] = result;
		const hashedSuppliedBuf = await scrypt(supplied, salt, 64);
		return hashed === hashedSuppliedBuf.toString('hex');
	}
}

//EXPORT AN INSTANCE OF TH CLASS
module.exports = new usersRepository('users.json');

// const test = async () => {
// 	const repo = new usersRepository('users.json');

//await repo.create({ email: 'te1lytubby@test.com', password: 'pass=bass' });

//const users = await repo.getAll();

//console.log(users);

//const user = await repo.getOne('fba425e9');

//console.log(user);

//await repo.delete('1b418cf2');

//await repo.update('2ebe0aa5', { email: 'john@john.com', loggedIn: 'today' });
// 	const user = await repo.getOneBy({ email: 'te1@test.com' });
// 	console.log(user);
// };

//test();

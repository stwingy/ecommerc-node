const fs = require('fs');

const crypto = require('crypto');

class usersRepository {
	constructor(fileName) {
		if (!fileName) throw new Error('File name required');

		this.fileName = fileName;

		try {
			fs.accessSync(this.fileName); //async not allowed in constructor
		} catch (error) {
			fs.writeFileSync(this.fileName, '[]'); //if no file create one
		}
	}

	async getAll() {
		//open this.fileName

		//const contents = await fs.promises.readFile(this.fileName, { encoding: 'utf8' });

		//read contents

		//console.log(contents);

		//parse contents

		// data = JSON.parse(contents);

		//return the parsed data

		//return data;

		return JSON.parse(await fs.promises.readFile(this.fileName, { encoding: 'utf8' }));
	}

	async create(attrs) {
		attrs.id = this.randomId();

		const records = await this.getAll();

		records.push(attrs);

		await this.writeAll(records);
		return attrs;
	}

	async writeAll(records) {
		await fs.promises.writeFile(this.fileName, JSON.stringify(records, null, 2)); //{ encoding: 'utf8' } could be added but is default,    null,2 json on seperate lines
	}

	randomId() {
		return crypto.randomBytes(4).toString('hex');
	}

	async getOne(id) {
		const records = await this.getAll();

		return records.find((record) => record.id === id);
	}

	async delete(id) {
		const records = await this.getAll();

		const filtered = records.filter((record) => record.id !== id);

		await this.writeAll(filtered);
	}

	async update(id, attrs) {
		const records = await this.getAll();

		const record = records.find((record) => record.id === id);

		console.log(record);

		if (!record) {
			throw new Error(`Unable to find record id number ${id}`);
		}

		Object.assign(record, attrs);

		await this.writeAll(records);
	}
	async getOneBy(filters) {
		const records = await this.getAll();
		for (let record of records) {
			let found = true;
			for (let key in filters) {
				if (record[key] !== filters[key]) {
					found = false;
				}
			}
			if (found) return record;
		}
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

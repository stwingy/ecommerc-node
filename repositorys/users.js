const fs = require('fs');
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
		const records = await this.getAll();
		records.push(attrs);
		await fs.promises.writeFile(this.fileName, JSON.stringify(records)); //{ encoding: 'utf8' } could be added but is default
	}
}
const test = async () => {
	const repo = new usersRepository('users.json');
	await repo.create({ email: 'test@test.com', password: 'password' });
	const users = await repo.getAll();
	console.log(users);
};

test();

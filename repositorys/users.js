const fs = require('fs');
class usersRepository {
	constructor(fileName) {
		if (!fileName) throw new Error('File name required');
		this.fileName = fileName;
		try {
			fs.writeFileSync(this.fileName, '[]');
		} catch (error) {
			fs.accessSync(this.fileName); //async not allowed in constructor
		}
	}
}

const repo = new usersRepository('users.json');

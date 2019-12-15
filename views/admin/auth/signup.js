const layout = require('../layout');
module.exports = ({ req }) => {
	return layout({
		content: `
        id is ${req.session.userId}
        <div>
            <form method ="POST">
            <input name = "email" type = "email" placeholder="Enter your email" />
            <input name = "password" type = "password" placeholder="Enter your password" />
            <input name = "passwordConfirmation" type = "password" placeholder="Confirm Password" />
            <button type = "submit">Submit</button>
            </form>
        </div>
        `
	});
};

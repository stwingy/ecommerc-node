const layout = require('../layout');
module.exports = () => {
	return layout({
		content: `
    <div>
        <form method ="POST">
            <input name = "email" type = "email" placeholder="Enter your email" />
            <input name = "password" type = "password" placeholder="Enter your password" />
            <button type = "submit">Sign in</button>
         </form>
     </div>
            `
	});
};

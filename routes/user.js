
exports.signup = function (req, res) {
	message = '';
	if (req.method == "POST") {
		console.log('exports.signup');
		var post = req.body;
		var name = post.user_name;
		var pass = post.password;
		var fname = post.first_name;
		var lname = post.last_name;
		var mob = post.mob_no;
		var use_type = post.account_type;
		console.log(use_type);
		var sql = "INSERT INTO users (first_name, last_name, mob_no, user_name, password, type) VALUES('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + use_type + "')";

		var query = db.query(sql, function (err, result) {
			if (err) throw err;
			console.log('User created');
			message = "Succesfully! Your account has been created.";
			res.render('display.ejs', { message: message });
		});

	} else {
		res.render('signup');
	}
};


exports.login = function (req, res) {
	var message = '';
	var sess = req.session;

	if (req.method == "POST") {
		var post = req.body;
		var name = post.user_name;
		var pass = post.password;
		var sql = "SELECT id, first_name, last_name, user_name, type FROM users WHERE user_name='" + name + "' and password = '" + pass + "'";
		console.log('SQL query');
		db.query(sql, function (err, results) {
			if (err) throw err;
			console.log('SQL query result');
			if (results.length) {
				//Here need to create magic for different users
				req.session.userId = results[0].id;
				req.session.user = results[0];
				var name = results[0].user_name;
				var type = results[0].type;
				console.log(type);

				switch (type) {
					case 0:
						res.render('admin');
						break;
					case 1:
						res.render('student_new');
						break;
					case 2:
						res.render('universityagent_new');
						break;
					case 3:
						res.render('visaagent_new');
						break;
					case 4:
						res.render('ticketagent_new');
						break;
				}
			}
			else {
				message = 'Wrong Credentials.';
				res.render('display.ejs', { message: message });
			}

		});
	} else {
		res.render('index.ejs', { message: message });
	}
};

exports.dashboard = function (req, res, next) {

	var user = req.session.user,
		userId = req.session.userId;

	if (userId == null) {
		res.redirect("/home/login");
		return;
	}

	var sql = "SELECT * FROM `login_details` WHERE `id`='" + userId + "'";

	db.query(sql, function (err, results) {

		console.log(results);

		res.render('profile.ejs', { user: user });

	});
};

exports.logout = function (req, res, next) {
	req.session.destroy((err) => {
		res.redirect('/') // will always fire after session is destroyed
	})
};

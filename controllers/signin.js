const handleSignIn = (req,res,db,bcrypt)=> {	
	db.select('email','hash').from('login').where('email', req.body.email)
	.then(data=> {
		const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
		if(isValid) {
			db.select().from('users').where('email',req.body.email)
			.then(user=> res.json(user[0]))
		} else {
			res.status(400).json('Incorrect password')
		}
	})
	.catch(err=> res.status(400).json('email doesnt exist'))
}

module.exports = {handleSignIn:handleSignIn} //or we can write as {handleSingIn} ES6 syntax 
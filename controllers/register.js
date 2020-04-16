const handleRegister = (req,res,db,bcrypt)=> {
	const {name, email, password} = req.body;
	if(!email || !password || !name) {
		return res.status(400).json('Enter user details!')
	}
	const hash = bcrypt.hashSync(password, 1);
	db.transaction(trx=>{
		db('login').transacting(trx)
		.insert({
			email: email,
			hash: hash
		})
		.returning('email')
		.then(loginEmail=> {
			return db('users').transacting(trx)
			.returning('*')
			.insert({
				name:name,
				email:loginEmail[0],
				joinedIn:new Date()
			})
			.then(user=> res.json(user[0]))
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err=> res.status(400).json('unable to register'))
}

module.exports = {handleRegister}
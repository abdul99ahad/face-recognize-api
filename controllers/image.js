const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: '0f5787815ae4411aa5f4d5cb8c681952'});

const handleImageURL = (req,res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL , req.body.input)
	.then(data=> res.json(data))
	.catch(err=> res.status(400).json('Bad Request for Image'))
}


const handleImage = (req,res,db)=>{
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => res.json(entries[0]))
	.catch(err=> res.status(400).json('error updating entries'))
}

module.exports = {handleImage,handleImageURL}
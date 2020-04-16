const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'pakistan',
    database : 'face-recognize'
  }
})

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/signin', (req,res) => signin.handleSignIn(req,res,db,bcrypt))

app.post('/register', (req,res)=> register.handleRegister(req,res,db,bcrypt))

app.get('/profile/:id',(req,res)=> profile.handleGetProfile(req,res,db))

app.put('/image',(req,res)=>image.handleImage(req,res,db))

app.post('/imageURL',(req,res)=>image.handleImageURL(req,res))

app.listen(3000, ()=> {
	console.log('port is running 3000')
})

/* 
/ --> res = I'm working 
/singin --> POST -> success/fail
/register --> POST -> user details 
/profile/:userId --> GET = get User from temp_db 
/image --> PUT -> Update count of rank based on users 
*/
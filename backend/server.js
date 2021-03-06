const express 		= require('express');
const bodyParser 	= require('body-parser');
const cors 			= require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const database ={
	users:[
		{
			id : '123',
			name: 'John',
			email : 'john@gmail.com',
			password : 'cookies',
			entries  : 0,
			joined : new Date()
		},
		{
		id : '124',
			name: 'Jack',
			email : 'jack@gmail.com',
			password : 'cookie',
			entries  : 0,
			joined : new Date()
		},
	]
}

app.get('/',(req , res) => {
	res.send(database.users);
})

app.post('/signin', (req ,res ) =>{
	 if (req.body.email === database.users[0].email &&
	 	req.body.password === database.users[0].password)
	{
		res.json('Success!')
	}else{
		res.status(400).json('error login in')
	}
	
})

app.post('/register' , (req, res) => {
	const {email , name , password } = req.body;
	database.users.push({
		id : '125',
			name: name,
			email : email,
			password : password,
			entries  : 0,
			joined : new Date()

	})
	res.json(database.users[database.users.length -1 ]);
})

app.get ('/profile/:id/', (req , res ) =>{
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id){
			found = true;
			return res.json(user);
		}
	})
	if(!found){
		res.status(404).json('not found');
	}

})

app.post('/image', (req , res) =>{
	const { id } = req.body;
	let found = false;
	
	database.users.forEach(user => {
		if(user.id === id){
			found = true;
			user.entries ++;
			return res.json(user.entries);
		}
	})
	if(!found){
		res.status(404).json('not found');
	}
})


app.listen(3000,()=>{
	console.log('Server start at port 3000');
})

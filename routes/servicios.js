const { Router } = require('express');
const router = Router();


// rutas
router.get('/', (req,res)=>{
	const dojo =[
		{	id: 0, 
			name: 'EEUU',
		 },
		 {	id: 1, 
			name: 'Chile',
		 },
		 {	id: 2, 
			name: 'Brasil',
		 },
		];
	
	const  lenguage =[
		{	id: 1, 
			name: 'Phyton',
		 },
		 {	id: 2, 
			name: 'Javascript',
		 },
		 {	id: 3, 
			name: 'Visual Basic',
		 },
		];
	

	const dojos = dojo;
	const lenguages = lenguage;
	res.render('index.ejs',{dojo: dojos, lenguage: lenguages});

});

router.get('/contador', (req,res)=>{

res.render('contador.ejs',{});

});

router.get('/colores', (req,res)=>{

	res.render('colores.ejs',{});
	
	});
	

router.post('/result', (req,res)=>{
	const new_encuesta = {
		name1: req.body.name1,
		name2: req.body.name2,
		select1: req.body.select1,
		select2: req.body.select2,
		textarea: req.body.textarea
		
	};	
	encuestas = new_encuesta;
	res.render('result.ejs',{encuesta: encuestas});
})


module.exports = router;

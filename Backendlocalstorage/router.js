let express = require('express');                //这里的express需要重新再引入一次，因为这样写没有把indexjs的express传入
let router = express.Router();  
let handle=require('./do.js'); 

// router.get('/',function(req,res){
// 	res.send('ok');
// });

router.get('/',function(req,res){
	handle.main(req,res);	
});

router.get('/add',function(req,res){
	handle.add(req,res);	
});

router.post('/add',function(req,res){
	handle.addbook(req,res);	
});

router.get('/edit',function(req,res){
	handle.edit(req,res);	
});

router.post('/edit',function(req,res){
	handle.editbook(req,res);	
});

router.get('/del',function(req,res){
	handle.del(req,res);	
});

module.exports=router;
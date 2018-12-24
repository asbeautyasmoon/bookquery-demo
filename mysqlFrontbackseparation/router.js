let express = require('express');
let router=express.Router(); 
let fnc=require('./func.js');

router.get('/',function(req,res){       //单独渲染主页
	fnc.render(req,res);
});

router.get('/index.html',function(req,res){
	fnc.render(req,res);
});


router.get('/showall',function(req,res){     //把书的请求分开来处理，因为请求只返回json
	fnc.showall(req,res);
});


// router.get('/add',function(req,res){     //由于前端直接做弹出窗，无需进行get的 add处理
// 	fnc.add(req,res);
// });
// 

router.post('/add',function(req,res){
	fnc.add(req,res);
});

router.post('/updata',function(req,res){
	fnc.updata(req,res);
});

router.get('/del',function(req,res){
	fnc.del(req,res);
});


router.use(function(req,res){             //其他的访问处理
	res.set('Content-Type', 'text/html');    //express设置头是用这个
	//res.setHeader('Content-Type', 'text/html; charset=utf-8')
	res.send('<h1>未找到该页面！</h1>');
});


module.exports=router;
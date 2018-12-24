let express = require('express');
let router=require('./router.js');
let app = express();


app.use('/public', express.static('./public/'));         //前端渲染的话只要开启目录就可以直接访问了，不要再判断路由再渲染页面，但是这样会产生默认页也在开启目录

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());  

app.use(router);



app.listen(3000, function () {
  console.log('app is running at port 3000.');
});
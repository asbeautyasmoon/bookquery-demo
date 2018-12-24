let express = require('express');
let router=require('./router.js');
let app = express();

app.use('/public/', express.static('./public/'));
app.engine('html', require('express-art-template'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());  

app.use(router);




app.listen(3000, function () {
  console.log('app is running at port 3000.');
});
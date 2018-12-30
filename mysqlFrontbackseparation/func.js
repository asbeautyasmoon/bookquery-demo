let db = require('./db.js');
let fs=require('fs');
const http = require('http');

module.exports.render = function(req, res) {
    var options = {
        root: __dirname + '/public/',
        headers: {
            'Content-Type': 'text/html'
        }
    };
    res.sendFile('index.html', options, function(err) {
        if (err) {
            throw err;
        }
    });
};

module.exports.showall = function(req, res) {
    let sql = 'select * from allbook';
    db.handle(sql, null, function(result) {
        res.send(result);
    });

};
module.exports.add = function(req, res) {
    let sql = 'insert into allbook set ?';
    let data = req.body;
    db.handle(sql, data, (result) => {
        res.send(result);
    });

};


module.exports.updata = function(req, res) {
    let sql = " UPDATE allbook SET name = ? ,author=?,category=?,`describe`=? WHERE id = ?"; //基本语法
    let data = [req.body.name, req.body.author, req.body.category, req.body.describe, parseInt(req.body.id)];
    //console.log(data)
    db.handle(sql, data, (result) => {
        res.send(result);
    });
}


module.exports.del = function(req, res) {
    let sql = 'delete from allbook where id=?';
    let data = parseInt(req.query.id);
    //console.log(data);
    db.handle(sql, data, (result) => {
        res.send(result);
    });

};

module.exports.getcity = function(req, res) {
     fs.readFile(__dirname+"/public/cityoldcode.txt",  function(e,d){
        if (e) {
            return console.log(e);
        }
        let arradres=d.toString().split('\r\n');
        let arrobj=[];
        
        for (var i = 0; i < arradres.length; i++) {
            let smarr=arradres[i].split('\t');
            let smaobj={city:smarr[0],code:smarr[1]};
            arrobj.push(smaobj);

        }
       // console.log(arrobj);
        res.send(arrobj);
    });

};


module.exports.weather = function(req, res) {
    //console.log(req.query);
    let options = {
        protocol : 'http:',
        hostname : 'www.weather.com.cn',
        port : 80,
        path : '/data/sk/'+req.query.code+'.html',
        method : 'get'
    }
     let requ = http.request(options,(resu)=>{
        let info = '';

        resu.on('data',(chunk)=>{
            info += chunk;
        });
        resu.on('end',()=>{
            info = JSON.parse(info);    //得到请求响应回来的数据
            //console.log(info);
            res.send(info);
        });
    });

    requ.end();





};

      
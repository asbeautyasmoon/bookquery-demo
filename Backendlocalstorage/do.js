let fs = require('fs');
let data = require('./data.json'); //注意，可以直接引入json文件，不需要用fsread处理


let write=function(res){
	 fs.writeFile(__dirname + '/data.json', JSON.stringify(data), function(err) {
        if (err) { throw err };
        res.redirect('/');
    });
}


module.exports.main = function(req, res) {
    res.render('index.html', {
        arr: data,                    
    });
};

module.exports.add = function(req, res) {
    res.render('add.html', {});

};

module.exports.addbook = function(req, res) {
    //console.log(req.body);
    let idarr = [];
    for (var i = 0; i < data.length; i++) {
        idarr.push(data[i].id);
    }
    let id = parseInt(Math.max.apply(Math, idarr)) + 1; //取数组最大值+1位id
    //console.log('我被读取了',id);


    req.body.id = id;
    data.push(req.body);
    //console.log(data);
    
    write(res);
};


module.exports.edit = function(req, res) {
	for (var i = 0; i < data.length; i++) {
		if (parseInt(data[i].id)===parseInt(req.query.id)) {
			  res.render('edit.html', data[i]);
		}
	}

};

module.exports.editbook = function(req, res) {
	for (var i = 0; i < data.length; i++) {
		 if (parseInt(data[i].id)===parseInt(req.body.id)) {
			  data[i]=req.body;
			  write(res);
		}
	}


};


module.exports.del = function(req, res) {
	for (var i = 0; i < data.length; i++) {
		if (parseInt(data[i].id)===parseInt(req.query.id)) {
			  data.splice(i,1);
		}
	}
	write(res);

};

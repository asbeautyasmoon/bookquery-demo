let db = require('./db.js');

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
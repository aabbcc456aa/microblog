/*
 * GET home page.
 */
//
//exports.index = function(req, res){
//  res.render('index', { title: 'Express' });
//};
//
//exports.user = function(reg,res){
//};
//
//exports.post = function(reg,res){
//};
//
//exports.reg = function(reg,res){
//};
//
//exports.doReg = function(reg,res){
//};
//
//exports.login = function(reg,res){
//};
//
//exports.doLogin = function(reg,res){
//};
//
//exports.logout = function(reg,res){
//};

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', { title: "首页"   , layout: 'layout'});
    });
    app.get("/reg", function (req, res) {
        res.render('reg', { title: "用户注册" });
    });
}

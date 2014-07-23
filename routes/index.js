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
var User = require('../models/user.js');
var crypto = require('crypto');


module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', { title: "首页" });
    });
    app.get("/reg", function (req, res) {
        res.render('reg', { title: "用户注册"});
    });

    app.post("/reg", function(req,res){
        if(req.body['password-repeat'] != req.body['password']){
//            req.flash('error','password is not same!');
            req.session.error = 'password is not same!';
            return res.redirect('/reg');
        }
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');

        var newUser = new User({
            name: req.body.username,
            password: password
        });


        User.get(newUser.name, function(err,user){
            if(user){
                err = 'Username already exists.';
            }
            if(err){
                req.session.error = err;
//                req.flash('error err');
                return res.redirect('/reg');
            }

            newUser.save(function(err){
               if(err){
                   console.log(err);
                   req.session.error = err;
//                   req.flash('error',err);
                   return res.redirect('/reg');
               }
                req.session.user = newUser;
                req.session.success = 'reg sucessful!';
//                req.flash('sucess','reg sucessful!');
                res.redirect('/');
            });
        });
    });

    app.get('/login',function(req,res){
        res.render('login', { title: "用户登陆" });
    });

    app.post("/login",function(req, res){
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');
        User.get(req.body.username,function(err,user){
            if(!user){
                req.session.error = "user not exist!";
                return res.redirect('/login');
            }
            if(user.password != password){
                req.session.error = "password incorrect!"
                return res.redirect('/login');
            }
            req.session.user = user;
            req.session.success = "login successful!";
            res.redirect('/');
        });
    });

    app.get("/logout",function(req,res){
        req.session.user = null;
        req.session.success = "logout successfule!";
        res.redirect("/");
    });

}

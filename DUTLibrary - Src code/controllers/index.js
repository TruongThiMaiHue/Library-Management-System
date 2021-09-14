var express = require("express");
var router = express.Router();
var userModel = require.main.require("./models/userModel");
var validationRules = require.main.require("./validation_rules/rules");
var asyncValidator = require("async-validator-2");
var nodemailer = require('nodemailer');
var randomToken = require ('random-token');

router.get("/", (req, res)=>{
    res.render("landing/home");
});

router.get("/login", (req, res)=>{
    res.render("landing/login", {res: [], errs: [], error: []});
});

router.post("/login", (req, res)=>{
    var email = req.body.email;
    var password = req.body.password

    var data = {
        email,
        password
    };
    var rules = validationRules.users.login;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=>{
        if (!errors) {
            userModel.validateUser(email, password, function(result){
                if (!result) {
                    res.render("landing/login", {res: data, errs: [], error: [{message: "Địa chỉ email hoặc mật khẩu không đúng !"}]});
                }
                else {
                    console.log(result);
                    if (result.verify == 1) {
                        if (result.is_admin == 1) {
                            req.session.admin = result.user_id;
                            res.redirect("/admin/home");
                        }
                        else {
                            req.session.student = result.user_id;
                            res.redirect("/student/home");
                        }
                    }
                    else {
                        res.render("landing/login", {res: data, errs: [], error: [{message: "Tài khoản chưa đươc xác thực ! Vui lòng xác thực địa chỉ Email."}]});
                    }
                }
            });
        }
        else {
            console.log(fields);
            res.render("landing/login", {res: data, errs: errors, error: []});
        }
    });

});

router.get("/verify", (req, res)=>{
    res.render("landing/verify", {error :[], success: []});
});

router.post("/verify", (req, res) => {
    var email = req.body.email;
    var token = req.body.token;
    
    userModel.matchtoken(token, email, (result) => {
        console.log(result);
        if (result.length > 0) {
            userModel.verify(email, (result) => {
                res.render("landing/verify", {success: [{message: "Xác thực Tài khoản thành công ! Bạn có thể đăng nhập vào Hệ thống."}], error: []});
            });
        } 
        else {
            res.render("landing/verify", {error: [{message: "Mã xác nhận không trùng khớp !"}], success: []});
        }
        });
    
    });

router.get("/signup", (req, res)=>{
    res.render("landing/signup", {res :[], errs: [], error: [], success: []});
});

router.post("/signup", (req, res)=> {
    var token = randomToken(8);
    
    var user = {
        name: req.body.name,
        email: req.body.email,
        code: req.body.code,
        password: req.body.password,
        faculty: req.body.faculty,
        class: req.body.class,
        token
    };

    var transporter = nodemailer.createTransport({ 
        service : "gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "thuviendut@gmail.com",
            pass: '16070702ttmh'
        }
    });
    var output =    `<p>Chào  `+ req.body.name + `, </p>
                    <p>Bạn đã đăng kí tài khoản Hệ thống thư viện Đại học Bách khoa - Đại học Đà Nẵng.</p>
                    <ul>Đây là thông tin xác nhận tài khoản của bạn</ul>                                  
                        <li>Email: `+ req.body.email + `</li>
                        <li>Token: `+ token + `</li>                                 
                    <p>Vui lòng nhấn vào <a href="http://localhost:8017/verify">ĐÂY</a> để xác thực !</p>
                    <p><strong>Đây là tin nhắn tự động. Vui lòng không trả lời lại.</strong></p>
                    <p class="font-italic">Thân ái,</p>
                    <p class="font-italic">Đại học Bách khoa - Đại học Đà Nẵng</p>`;
    var mailOptions = {
        from: "TruongThiMaiHue-17pfiev2@gmail.com", 
        to: req.body.email,  
        subject: "Xác thực tài khoản - Hệ thống thư viện DUT",
        html: output
    };

    var rules = validationRules.users.create;
    var validator = new asyncValidator(rules);
    validator.validate(user, (errors, fields)=> {
        if (!errors) {
            userModel.createUser(user, (result)=> {
                if (!result) {
                    res.render("landing/signup", {res: user, error: [{message:"Tài khoản với địa chỉ email này đã tồn tại !"}], errs: [], success: []});
                }
                else {   
                    transporter.sendMail(mailOptions, function(err, info){
                        if (err) {
                            return console.log(err);
                        }
                        console.log(info);
                    });
                    console.log(result);
                    res.render("landing/signup", {res: [], errs: [], error: [], success: [{message: "Đăng kí tài khoản thành công ! Vui lòng kiểm tra email để xác thực tài khoản."}]});
                }
            });
        }
        else {
            console.log(fields);
            res.render("landing/signup", {res: user, errs: errors, error: [] ,success: []});
        }
    });
});

router.get("/logout", (req, res)=> {
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;

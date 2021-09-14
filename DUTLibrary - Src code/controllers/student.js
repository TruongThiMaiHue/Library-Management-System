var express = require("express");
var router = express.Router();
var userModel = require.main.require("./models/userModel");
var bookModel = require.main.require("./models/bookModel");
var validationRules = require.main.require("./validation_rules/rules");
var asyncValidator = require("async-validator-2");

router.get("/home", (req, res)=> {
    bookModel.totalIssuedTurnS(req.session.student, (books)=> {
        if (!books) {
            res.send("Invalid");
        }
        else {
            console.log(books.length);
            bookModel.bookIssuedByStudent(req.session.student, (booksIss)=> {  
                if (!booksIss) {
                    res.send("Invalid");
                }
                else {
                    console.log(booksIss.length);
                    bookModel.bookRequestTurnS(req.session.student, (booksRe)=> {  
                        if (!booksRe) {
                            res.send("Invalid");
                        }
                        else {
                            console.log(booksRe.length);
                            userModel.getUser(req.session.student, (result)=> {
                                if (!result) {
                                    res.send("Invalid");
                                }
                                else {
                                    console.log(result);
                                    res.render("student/home", {res: result, total: books.length, issue: booksIss.length, req: booksRe.length});
                                }
                            });
                        }
                    })   
                }
            })    
        }
    });
});

router.get("/profile/edit", (req, res)=> {
    userModel.getUser(req.session.student, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render("student/profile-edit", {res: result, error: [], errs: [], success: []});
        }
    });
});

router.post("/profile/edit", (req, res)=> {
    var user = {
      user_id: req.body.user_id,
      code: req.body.code,
      name: req.body.name,
      class: req.body.class,
      faculty: req.body.faculty,
      email: req.body.email,
    };
    var rules = validationRules.update.student;
    var validator = new asyncValidator(rules);

    validator.validate(user, (errors, fields)=> {
        if (!errors) {
            userModel.updateUser(user, (result)=> {
                if (!result) {
                    res.render("student/profile-edit", {res: user, error: [{message: "Tài khoản với địa chỉ email này đã tồn tại !"}], errs: [], success:[]});
                }
                else {
                    res.render("student/profile-edit", {res: user, error: [], errs: [], success:[{message: "Sửa thông tin tài khoản thành công !"}]});
                }
            });
        }
        else {
            console.log(fields);
            res.render("student/profile-edit", {res: user, error: [], errs: errors, success: []});
        }
    });
});

router.get("/profile/changepass", (req, res)=> {
    userModel.getUser(req.session.student, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render("student/profile-changepass", {res: result, error: [], errs: [], success: []});
        }
    });
});

router.post("/profile/changepass", (req, res)=> {
    var id = req.body.user_id;
    var password = req.body.password ;
    var oldPassword = req.body.oldPassword;
    var newPassword = req.body.newPassword;
    var confirmPassword = req.body.confirmPassword;
    var data = {
        oldPassword,
        newPassword,
        confirmPassword,
    };
    var rules = validationRules.users.changePassword;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=> {
        if (!errors) {
            if (password == oldPassword) {
                if (newPassword == confirmPassword) {
                    userModel.updatePassword (newPassword, id, (result)=> {
                        if (!result) {
                            res.send("Invalid");
                        }
                        else {
                            userModel.getUser(req.session.student, (result)=> {
                                if (!result) {
                                    res.send("Invalid");
                                }
                                else {
                                    console.log(result);
                                    res.render("student/profile-changepass", {res: result, error: [], errs: [], success: [{message: "Thay đổi mật khẩu thành công !"}]});
                                }
                            });
                        }
                    });
                }
                else {
                    userModel.getUser(req.session.student, (result)=> {
                        if (!result) {
                            res.send("Invalid");
                        }
                        else {
                            console.log(result);
                            res.render("student/profile-changepass", {res: result, error: [{message: "Mật khẩu xác nhận không trùng khớp !"}], errs: [], success: []});
                        }
                    });
                }
            }   
            else {
                userModel.getUser(req.session.student, (result)=> {
                    if (!result) {
                        res.send("Invalid");
                    }
                    else {
                        console.log(result);
                        res.render("student/profile-changepass", {res: result, error: [{message: "Mật khẩu cũ không trùng khớp ! "}], errs: [], success: []});
                    }
                });
            }
        }
        else {
             userModel.getUser(req.session.student, (result)=> {
                if (!result) {
                    res.send("Invalid");
                }
                else {
                    console.log(result);
                    res.render("student/profile-changepass", {res: result, error: [], errs: errors, success: []});
                }
            });
        }
    });
});


router.get("/books", (req, res)=> {
    bookModel.getAll((result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render("student/books", {res: result, len: [], success: []});
        }
    });
});

router.post("/books", (req, res)=> {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    bookModel.searchBy(searchBy, word, (result)=> {
        console.log(result);
        res.render("student/books", {res: result, len: result.length, success: [{message: "kết quả tìm kiếm được"}]})
    });
});

router.get("/books/detail/:id", (req, res)=> {
    var id = req.params.id;
    bookModel.getBook(id, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            res.render("student/books-detail", {res: result, id});
        }
    });
});

router.get("/books/borrow", (req, res)=> {
    bookModel.bookIssuedByStudent(req.session.student, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render("student/books-borrow", {res: result});
        }
    });
});

router.get("/books/history", (req, res)=> {
    bookModel.totalIssuedTurnS(req.session.student, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render("student/books-history", {res: result});
        }
    });
});

router.get("/books/request", (req, res)=> {
    res.render("student/books-request", {res: [], errs: [], success: []});
});

router.post("/books/request", (req, res)=> {
    if (!req.files) {
        var imgName = "default.png";
    } 
    else {
        var img = req.files.image;
            if (img.mimetype == "image/jpeg" ||img.mimetype == "image/png"||img.mimetype == "image/gif") {
            var imgName = img.name; 
            img.mv("public/publicImage/"+imgName+"");
        }  
    }    
    var book = {
        imgName,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        edition: req.body.edition
    };
    var rules = validationRules.books.request;
    var validator = new asyncValidator(rules);

    validator.validate(book, (errors, fields)=> {
        if(!errors){
            bookModel.bookRequest(req.session.student, book, (result)=> {
                if (!result) {
                    res.send("Invalid");
                }
                else {
                    res.render("student/books-request", {res: [], errs: [], success: [{message: "Đề nghị của bạn đã được gửi tới Quản lý !"}]});
                }
            });
        }
        else {
            console.log(fields);
            res.render("student/books-request", {res: book, errs: errors, success: []});
        }
    });
});

module.exports = router;

var express = require("express");
var router = express.Router();
var userModel = require.main.require("./models/userModel");
var bookModel = require.main.require("./models/bookModel");
var validationRules = require.main.require("./validation_rules/rules");
var asyncValidator = require("async-validator-2");


router.get("/home", (req, res)=> {
    userModel.getAllStudent((student)=> {
        if (!student) {
            res.send("Invalid");
        }
        else {
            userModel.getAllAdmin((admin)=> {
                if (!admin) {
                    res.send("Invalid");
                }
                else {
                    bookModel.getAll((books)=> {
                        if (!books) {
                            res.send("Invalid");
                        }
                        else {
                            bookModel.getIssuedBook((IssueB)=> {
                                if (!IssueB) {
                                    res.send("Invalid");
                                }  
                                else {
                                    bookModel.getIssuedBookTurn((turn)=> {
                                        if (!turn) {
                                            res.send("Invalid");
                                        }
                                        else {
                                            bookModel.getRequestedBook((req)=> {
                                                if (!req) {
                                                    res.send("Invalid");
                                                }
                                                else {
                                                    res.render("admin/home", {res: admin, st: student.length, ad: admin.length, bk: books.length, iss: IssueB.length, turn: turn.length, req: req.length });
                                                }
                                            });                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        };
    });
});

router.get("/profile", (req, res)=> {
    userModel.getUser(req.session.admin, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render("admin/profile", {res: result});
        }
    });
});

router.get("/profile/edit", (req, res)=> {
    userModel.getUser(req.session.admin, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render("admin/profile-edit", {res: result, error: [], errs: [], success:[]});
        }
    });
});

router.post("/profile/edit", (req, res)=> {
    var rules = validationRules.update.admin;
    var validator = new asyncValidator(rules);
    var ad = {
        user_id: req.body.user_id,
        code: req.body.code,
        name: req.body.name,
        email: req.body.email,
    };
    validator.validate(ad, (errors, fields)=> {
        if (!errors) {
            userModel.updateAdmin(ad, (result)=> {
                if (!result) {
                    res.render("admin/profile-edit", {res: ad, error: [{message: "Tài khoản với địa chỉ email này đã tồn tại !"}], errs: [], success:[]});
                }
                else {
                    res.render("admin/profile-edit", {res: ad, error: [], errs: [], success:[{message: "Sửa thông tin tài khoản thành công !"}]});
                }
            });
        }
        else {
            console.log(fields);
            res.render("admin/profile-edit", {res: ad, error: [], errs: errors, success: []});
        }
    });
});

router.get("/profile/changepass", (req, res)=> {
    userModel.getUser(req.session.admin, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render("admin/profile-changepass", {res: result, error: [], errs: [], success: []});
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
                            userModel.getUser(req.session.admin, (result)=> {
                                if (!result) {
                                    res.send("Invalid");
                                }
                                else {
                                    console.log(result);
                                    res.render("admin/profile-changepass", {res: result, error: [], errs: [], success: [{message: "Thay đổi mật khẩu thành công !"}]});
                                }
                            });
                        }
                    });
                }
                else {
                    userModel.getUser(req.session.admin, (result)=> {
                        if (!result) {
                            res.send("Invalid");
                        }
                        else {
                            console.log(result);
                            res.render("admin/profile-changepass", {res: result, error: [{message: "Mật khẩu xác nhận không trùng khớp !"}], errs: [], success: []});
                        }
                    });
                }
            }   
            else {
                userModel.getUser(req.session.admin, (result)=> {
                    if (!result) {
                        res.send("Invalid");
                    }
                    else {
                        console.log(result);
                        res.render("admin/profile-changepass", {res: result, error: [{message: "Mật khẩu cũ không trùng khớp ! "}], errs: [], success: []});
                    }
                });
            }
        }
        else {
             userModel.getUser(req.session.admin, (result)=> {
                if (!result) {
                    res.send("Invalid");
                }
                else {
                    console.log(result);
                    res.render("admin/profile-changepass", {res: result, error: [], errs: errors, success: []});
                }
            });
        }
    });
});

router.get("/students", (req, res)=> {
    userModel.getAllStudent((result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render("admin/students", {res: result});
        }
    });
});

router.post("/students", (req, res)=> {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    userModel.searchBy(searchBy, word, (result)=> {
        console.log(result);
        res.render("admin/students", {res: result})
    }); 
});

router.get("/students/profile/:id", (req, res)=> {
    var id = req.params.id;
    userModel.getUser(id, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result);
            bookModel.bookIssuedByStudent(id, (books)=> {  
                if (!books){
                    res.send("Invalid");
                }
                else {
                    console.log(books.length);
                    res.render("admin/students-profile", {res: result, issue: books.length});
                }
            })        
        }
    });
});

router.get("/students/add", (req, res)=> {
    res.render("admin/students-add", {res: [], errs: [], error: [], success: []});
});

router.post("/students/add", (req, res)=> {
    var user = {
        name: req.body.name,
        email: req.body.email,
        code: req.body.code,
        password: req.body.password,
        faculty: req.body.faculty,
        class: req.body.class
    };

    var rules = validationRules.users.create;
    var validator = new asyncValidator(rules);

    validator.validate(user, (errors, fields)=> {
        if (!errors) {
            userModel.createUser(user, (result)=> {
                if (!result) {
                    res.render("admin/students-add", {res: user, error: [{message:"Tài khoản với địa chỉ email này đã tồn tại !"}], errs: [], success: []});
                }
                else {
                    console.log(result);
                    res.render("admin/students-add", {res: [], errs: [], error: [], success: [{message: "Cấp tài khoản thành công !"}]});
                }
            });
        }
        else {
            console.log(fields);
            res.render("admin/students-add", {res: user, errs: errors, error: [] ,success: []});
        }
    });
});

router.get("/students/edit/:id", (req, res)=> {
    var id = req.params.id;
    userModel.getUser(id, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            res.render("admin/students-edit", {res: result, id, error: [], success: [], errs: []});
        }
    });
});

router.post("/students/edit/:id", (req, res)=> {
    var student = {
        name: req.body.name,
        email: req.body.email,
        code: req.body.code,
        password: req.body.password,
        class: req.body.class,
        faculty: req.body.faculty
    };
    var id = req.params.id;

    var rules = validationRules.users.create;
    var validator = new asyncValidator(rules);

    validator.validate(student, (errors, fields)=> {
        if (!errors) {
            userModel.updateStudent(id, student, (result)=> {
                if (!result) {
                    res.render("admin/students-edit", {res: student, id, error: [{message:"Tài khoản với địa chỉ email này đã tồn tại !"}], errs: [], success: []});
                }
                else {
                    console.log(result);
                    res.render("admin/students-edit", {res: student, id, success: [{message:"Chỉnh sửa thông tin thành công !"}], error: [], errs: []});
                }
            });
        }
        else {
            console.log(fields);
            res.render("admin/students-edit", {res: student, id, error:[], success:[], errs: errors});
        }
    });
});

router.get("/students/delete/:id", (req, res)=> {
    var id = req.params.id;
    userModel.getUser(id, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render("admin/students-delete", {res: result});
        }
    });
});

router.post("/students/delete/:id", (req, res)=> {
    var id = req.params.id;
    userModel.deleteUser(id, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.redirect("/admin/students");
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
            res.render("admin/books", {res: result});
        }
    });
});

router.post("/books", (req, res)=> {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    bookModel.searchBy(searchBy, word, (result)=> {
        console.log(result);
        res.render("admin/books", {res: result})
    });
});

router.get("/books/detail/:id", (req, res)=> {
    var id = req.params.id;
    bookModel.getBook(id, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            res.render("admin/books-detail", {res: result, id});
        }
    });
});

router.get("/books/add", (req, res)=> {
    res.render("admin/books-add", {res: [], error: [], errs: [], success: []});
});

router.post("/books/add", (req, res)=> {
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
        genre: req.body.genre,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        edition: req.body.edition,
        isbn: req.body.isbn,
        pages: req.body.pages,
        description: req.body.description
    };

    var rules = validationRules.books.create;
    var validator = new asyncValidator(rules);

    validator.validate(book, (errors, fields)=> {
        if (!errors) {
            bookModel.createBook(book, (result)=> {
                if(!result){
                    res.render("admin/books-add", {res: book, error: [{message: "Ấn phẩm có mã ISBN này đã tồn tại !"}], errs: [], success: []});
                }
                else {
                    console.log(result);
                    res.render("admin/books-add", {res: [], error: [], errs: [], success: [{message: "Thêm ấn phẩm thành công !"}]});
                }
            });
        }
        else {
            console.log(fields);
            res.render("admin/books-add", {res: book, error: [], errs: errors, success: []});
        }
    });
});

router.get("/books/edit/:id", (req, res)=> {
    var id = req.params.id;
    bookModel.getBook(id, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            res.render("admin/books-edit", {res: result, id, error: [], errs: [], success: []});
        }
    });
});

router.post("/books/edit/:id", (req, res)=> {
    if (!req.files) {
        var imgName = req.body.image;
    } 
    else {
        var img = req.files.image;
        if(img.mimetype == "image/jpeg" ||img.mimetype == "image/png"||img.mimetype == "image/gif") {
            var imgName = img.name; 
            img.mv("public/publicImage/"+imgName+"");
        }  
    } 
    var book = {
        imgName,
        genre: req.body.genre,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        edition: req.body.edition,
        isbn: req.body.isbn,
        pages: req.body.pages,
        description: req.body.description
    };

    var id = req.params.id;
    var rules = validationRules.books.create;
    var validator = new asyncValidator(rules);

    validator.validate(book, (errors, fields)=> {
        if(!errors) { 
            bookModel.updateBook(id, book, (result)=> {
                if (!result) {
                    res.render("admin/books-edit", {res: book, id, error: [{message: "Ấn phẩm có mã ISBN này đã tồn tại !"}], errs: [], success: []});
                }
                else {
                    console.log(result);
                    res.render("admin/books-edit", {res: book, id, error: [], errs:[], success: [{message: "Sửa ấn phẩm thành công !"}]});
                }
            });
        }         
        else {
            console.log(fields);
            res.render("admin/books-edit", {res: book, id, error: [], errs: errors, success: []})
        }
    });
});

router.get("/books/delete/:id", (req, res)=> {
    var id = req.params.id;
    bookModel.getBook(id, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render("admin/books-delete", {res: result, id});
        }
    });
});

router.post("/books/delete/:id", (req, res)=> {
    var id = req.params.id;
    bookModel.deleteBook(id, (result)=> {
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.redirect("/admin/books");
        }
    });                  
});

router.get("/books/issued", (req, res)=> {
    bookModel.getIssuedBook((result)=> {
        if (!result) {
            res.send("Invalid!");
        }
        else {
            console.log(result);
            res.render("admin/books-issue", {res: result, success: []});
        }
    });
});

router.post("/books/issued", (req, res)=> {
    var id = req.body.book_id;
    bookModel.unissueBook(id, (result)=> {
        if (!result){
            res.send("Invalid");
        }
        else {
            bookModel.getIssuedBook((result)=> {
                if (!result) {
                    res.send("Invalid!");
                }
                else {
                    console.log(result);
                    res.render("admin/books-issue", {res: result, success: [{message: "Trả ấn phẩm thành công !"}]});
                }
            });
        }
    });
});

router.get("/books/:id/issue", (req, res)=> {
    userModel.getAllStudent((result)=> {  
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render("admin/books-user", {res: result, error: [], success: []});
        }
    });
});

router.post("/books/:id/issue", (req, res)=> {

    var book_id = req.params.id;  
    var user_id = req.body.user_id;
    
    bookModel.bookIssuedByStudent(user_id, (result)=> { 
        if (!result) {
            res.send("Invalid");
        }
        else {
            console.log(result.length);
            if (result.length <= 1) {
                bookModel.setIssueDate(book_id, user_id, (result)=> {
                    if (!result) {
                        res.send("Invalid");
                    }
                    else {
                        console.log(result);
                    }
                });
                bookModel.issueBook(book_id, user_id, (result)=> {
                    if (!result) {
                        res.send("Invalid");
                    }
                    else {
                        console.log(result);
                        res.render("admin/books-user", {res: result, error: [], success: [{message:"Cho mượn ấn phẩm thành công !"}]});
                    }
                });
            }
            else {
                userModel.getAllStudent((result)=> {
                    if (!result) {
                        res.send("Invalid");
                    }
                    else {
                        console.log(result);
                        res.render("admin/books-user", {res: result, error: [{message: "Sinh viên này đã mượn 2 ấn phẩm, hãy trả ấn phẩm đã mượn trước !"}], success: []});
                    }
                });
            }
        }
    });
});

router.get("/books/requested", (req, res)=> {
    bookModel.getRequestedBook((result)=> {
        if (!result){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render("admin/books-requested", {res: result});
        }
    });
});

router.post("/books/requested", (req, res)=> {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    bookModel.bookRequestSearch(searchBy, word, (result)=> {
        console.log(result);
        res.render("admin/books-requested", {res: result})
    });
});

module.exports = router;
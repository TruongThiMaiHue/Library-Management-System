var express = require("express");
var expressSession = require("express-session");
var fileUpload = require("express-fileupload");
var path = require("path");
var app = express();
var port = 8017;

var admin = require("./controllers/admin");
var student = require("./controllers/student");
var index = require("./controllers/index");


app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(expressSession({secret: "my top secret pass", resave: false, saveUninitialized: true}));
app.use("/public", express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public/publicImage")));
app.use(fileUpload());
app.use(function(req, res, next) {
	if (req.originalUrl == "/" || req.originalUrl == "/login" || req.originalUrl == "/signup" || req.originalUrl == "/verify") {
		next();
	}
	else {
		if (!req.session.admin && !req.session.student) {
			res.redirect("/");
			return;
		}
		next();
	}

});

app.use("/admin", admin);
app.use("/student", student);
app.use("/", index);


app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});

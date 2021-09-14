var db = require.main.require("./models/config");

var validateUser = (email, password, callback) => {
    var sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.executeQuery(sql, [email, password], function(result) {
        callback(result[0]); 
    });
};

var matchtoken = (token, email, callback) => {
    var sql = "SELECT * FROM users WHERE token = ? and email = ?";
    db.executeQuery(sql, [token, email], function(result) {
        callback(result); 
    });
};

var verify = (email, callback) => {
    var sql = "UPDATE users SET verify = 1 WHERE email = ?";
    db.executeQuery(sql, [email], function(result) {
        callback(result); 
    });
};

var getAllStudent = (callback) => {
    var sql = "SELECT * FROM users WHERE is_admin = 0";
    db.executeQuery(sql, null, function(result) {
        callback(result);
    });
};

var getAllAdmin= (callback) => {
    var sql = "SELECT * FROM users WHERE is_admin = 1";
    db.executeQuery(sql, null, function(result) {
        callback(result);
    });
};

var searchBy = (searchBy, word, callback) => {
    var sql = "SELECT * FROM users WHERE "+searchBy+" = ?";
    db.executeQuery(sql, [word], function(result) {
        callback(result);
    });
};

var getUser = (id, callback) => {
    var sql = "SELECT * FROM users WHERE user_id = ?";
    db.executeQuery(sql, [id], function(result) {
        callback(result[0]);
    });
};

var createUser = (user, callback) => {
    var sql = "INSERT INTO users VALUES(null,?,?, ?, ?, ?, ?, ?, ?, ?)";
    db.executeQuery(sql, [0,user.token,0, user.code, user.name, user.email, user.password, user.class, user.faculty], function(result) {
        callback(result);
    });
};

var updateAdmin = (ad, callback) => {
    var sql = "UPDATE users SET code = ?, name = ?, email = ? WHERE user_id = ?";
    db.executeQuery(sql, [ad.code, ad.name, ad.email, ad.user_id], function(result) {
        callback(result);
    });
};

var updateStudent = (id, student, callback) => {
    var sql = "UPDATE users SET code = ?, name = ?, email = ?, password = ? , faculty = ?, class = ? WHERE user_id = ?";
    db.executeQuery(sql, [student.code, student.name, student.email, student.password, student.faculty, student.class, id], function(result) {
        callback(result);
    });
};

var updateUser = (user, callback) => {
    var sql = "UPDATE users SET code = ?, name = ?, email = ?, class = ?, faculty = ?  WHERE user_id = ?";
    db.executeQuery(sql, [user.code, user.name, user.email, user.class, user.faculty, user.user_id], function(result) {
        callback(result);
    });
};

var deleteUser = (id, callback) => {
    var sql = "DELETE FROM users WHERE user_id = ?";
    db.executeQuery(sql, [id], function(result) {
        callback(result);
    });
};

var updatePassword = (password, id, callback) => {
    var sql = "UPDATE users SET password = ? WHERE user_id = ?";
    db.executeQuery(sql, [password, id], function(result) {
        callback(result);
    });
};

module.exports = {
    validateUser,
    matchtoken,
    verify,
    getAllAdmin,
    getAllStudent,
    searchBy,
    getUser,
    createUser,
    updateAdmin,
    updateStudent,
    updateUser,
    deleteUser,
    updatePassword
};

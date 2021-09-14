var db = require.main.require("./models/config");

var getAll = (callback) => {
    var sql = "SELECT * FROM books";
    db.executeQuery(sql, null, function(result) {
        callback(result);
    });
};

var searchBy = (searchBy, word, callback) => {
    var sql = "SELECT * FROM books WHERE "+searchBy+" = ?";
    db.executeQuery(sql, [word], function(result) {
        callback(result);
    });
};

var createBook = (book, callback) => {
    var sql = "INSERT INTO books VALUES(null, null, ?, ?, ?, ?, ?, ?, ?, ?, ?, null)";
    db.executeQuery(sql, [book.imgName, book.genre, book.title, book.author, book.publisher, book.edition, book.isbn, book.pages, book.description, book.date_issued], function(result) {
        callback(result);
    });
};

var getBook = (id, callback) => {
    var sql = "SELECT * FROM books WHERE book_id = ?";
    db.executeQuery(sql, [id], function(result) {
        callback(result[0]);
    });
};

var updateBook = (id, book, callback) => {
    var sql = "UPDATE books SET image = ?, genre = ?, title = ?, author = ?, publisher = ?, edition = ?, isbn = ?, pages = ?, description = ? WHERE book_id = ?";
    db.executeQuery(sql, [book.imgName, book.genre, book.title, book.author, book.publisher, book.edition, book.isbn, book.pages, book.description, id], function(result) {
        callback(result);
    });
};

var deleteBook = (id, callback) => {
    var sql = "DELETE FROM books WHERE book_id = ?";
    db.executeQuery(sql, [id], function(result) {
        callback(result);
    });
};

var unissueBook = (id, callback) => {
    var sql = "UPDATE books SET user_id = null, date_issued = null WHERE book_id = ?";
    db.executeQuery(sql, [id], function(result) {
        callback(result);
    });
};

var bookIssuedByStudent = (id, callback) => { 
    var sql = "SELECT * FROM books WHERE user_id = ?";
    db.executeQuery(sql, [id], function(result) { 
        callback(result);
    });
};

var setIssueDate = (book_id, user_id, callback) => {
    var date = new Date();
    var sql = "INSERT INTO issue_date VALUES(null, ?, ?, ?)";
    db.executeQuery(sql, [book_id, user_id, date], function(result) {
        callback(result);
    });
};

var issueBook = (book_id, student_id, callback) => {
    var date = new Date();
    var sql = "UPDATE books SET user_id = ?, date_issued = ? WHERE book_id = ?";
    db.executeQuery(sql, [student_id, date, book_id], function(result) {
        callback(result);
    });
};

var getIssuedBook = (callback) => {
    var sql = "SELECT books.*, users.* FROM users INNER JOIN books ON users.user_id = books.user_id WHERE users.user_id IS NOT NULL";
    db.executeQuery(sql, null, function(result) {
        callback(result);
    });
};

var totalIssuedTurnS = (id, callback) => {
    var sql = "SELECT books.*, issue_date.book_id, issue_date.date FROM issue_date INNER JOIN books ON issue_date.book_id = books.book_id WHERE issue_date.user_id = ?";
    db.executeQuery(sql, [id], function(result) {
        callback(result);
    });
};

var getIssuedBookTurn = (callback) => {
    var sql = "SELECT * FROM issue_date";
    db.executeQuery(sql, null, function(result) {
        callback(result);
    });
};

var getRequestedBook = (callback) => {
    var sql = "SELECT * FROM books_request";
    db.executeQuery(sql, null, function(result) {
        callback(result);
    });
};

var bookRequestSearch = (searchBy, word, callback) => {
    var sql = "SELECT * FROM books_request WHERE "+searchBy+" = ?";
    db.executeQuery(sql, [word], function(result) {
        callback(result);
    });
};

var bookRequestTurnS = (id, callback) => { 
    var sql = "SELECT * FROM books_request WHERE user_id = ?"; 
    db.executeQuery(sql, [id], function(result) { 
        callback(result);
    });
};

var bookRequest = (id, book, callback) => {
    var date = new Date();
    var sql = "INSERT INTO books_request VALUES(null, ?, ?, ?, ?, ?, ?, ?)";
    db.executeQuery(sql, [id, book.imgName, book.title, book.author, book.publisher, book.edition, date], function(result) {
        callback(result);
    });
};

module.exports = {
    getAll,
    searchBy,
    createBook,
    getBook,
    updateBook,
    deleteBook,
    unissueBook,
    bookIssuedByStudent,
    setIssueDate,
    issueBook,
    getIssuedBook,
    totalIssuedTurnS,
    getIssuedBookTurn,
    getRequestedBook,
    bookRequestSearch,
    bookRequestTurnS,
    bookRequest
};




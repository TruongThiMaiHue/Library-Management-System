module.exports = {
    update: {
        admin: {
            code: {
                required: true,
                message: "Cần nhập thông tin Mã nhân viên"
            }, 
            name: {
                required: true,
                message: "Cần nhập thông tin Họ tên"
            },
            email: [{
                required: true,
                message: "Cần nhập Địa chỉ Email"
            },
            {  
                required: false,
                type: "email",
                message: "Cần nhập đúng dạng Email"
            }],
        },
        student: {
            code: [{
                required: true,
                message: "Cần nhập thông tin MSSV"
            }, 
            {
                required: false,
                max: 9,
                message: "MSSV không quá 9 số"
            }],
            name: {
                required: true,
                message: "Cần nhập thông tin Họ tên"
            },
            class: {
                required: true,
                message: "Cần nhập thông tin Lớp"
            },
            faculty: {
                required: true,
                message: "Cần nhập thông tin Khoa"
            },
            email: [{
                required: true,
                message: "Cần nhập Địa chỉ Email"
            },
            {  
                required: false,
                type: "email",
                message: "Cần nhập đúng dạng Email"
            }],
        },
    },
      
    users: {
        create: {
            code: [{
                required: true,
                message: "Cần nhập thông tin MSSV"
            }, 
            {
                required: false,
                max: 9,
                message: "MSSV không quá 9 số"
            }],
            name: {
                required: true,
                message: "Cần nhập thông tin Họ tên"
            },
            class: {
                required: true,
                message: "Cần nhập thông tin Lớp"
            },
            faculty: {
                required: true,
                message: "Cần nhập thông tin Khoa"
            },
            email: [{
                required: true,
                message: "Cần nhập Địa chỉ Email"
            },
            {  
                required: false,
                type: "email",
                message: "Cần nhập đúng dạng Email"
            }],
            password: [{
                required: true,
                message: "Cần nhập Mật khẩu"
            },
            {
                required: false,
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 kí tự"
            }],    
        },
        changePassword: {
            oldPassword: {
                required: true,
                message: "Cần nhập Mật khẩu cũ"
            },
            newPassword: [{
                required: true,
                message: "Cần nhập Mật khẩu mới"
            },
            {
                required: false,
                min: 6,
                message: "Mật khẩu mới phải có ít nhất 6 kí tự"
            }],    
            confirmPassword: {
                required: true,
                message: "Cần nhập Mật khẩu xác nhận"
            }
        },
        login: {
            email: [{
                required: true,
                message: "Cần nhập Địa chỉ Email"
            },
            {  
                required: false,
                type: "email",
                message: "Cần nhập đúng dạng Email"
            }],
            password: {
                required: true,
                message: "Cần nhập Mật khẩu"
            },
        }
    },

    books: {
        create: {
            genre: {
                required: true,
                message: "Cần nhập thông tin Thể loại"
            },
            title: {
                required: true,
                message: "Cần nhập thông tin Tên bìa"
            },
            author: {
                required: true,
                message: "Cần nhập thông tin Tác giả"
            },
            publisher: {
                required: true,
                message: "Cần nhập thông tin Nhà xuất bản"
            },
            isbn: [{
                required: true,
                message: "Cần nhập thông tin Mã ISBN"
            }, {
                required: false,
                min: 13,
                max: 13,
                message: "Mã ISBN có 13 số"
            }]
        },
        request: {
            title: {
                required: true,
                message: "Cần nhập thông tin Tên bìa"
            },
            author: {
                required: true,
                message: "Cần nhập thông tin Tác giả"
            },
            publisher: {
                required: true,
                message: "Cần nhập thông tin Nhà xuất bản"
            }
        }
    }
};


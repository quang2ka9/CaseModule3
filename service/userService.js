const connection = require('../entity/connection');

class UserService {
    connect;

    constructor() {
        connection.connectToMySQL();
        this.connect = connection.getConnection()
    }

    getUser = (user) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select * from users where Email = '${user.Email}' and Password = '${user.Password}';`, (err, users) => {
                if (err) {
                    reject(err)
                }else {
                    resolve(users)
                }
            })
        })
    }
    postUser = (userRegister) => {
        return new Promise((resolve, reject) =>{
            this.connect.query(`insert into users (Username, Email, Password, Phone, Address, Image, Role) value ('${userRegister.Username}','${userRegister.Email}','${userRegister.Password}',${userRegister.Phone}, '${userRegister.Address}','${userRegister.Image}','${userRegister.Role}');`,(error, userRegisters) =>{
                if (error) {
                    reject(error)
                }else {
                    resolve(userRegisters)
                }
            })
        })
    }
    findByIdUser = (id) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select * from Users where Users.id = ${id}`, (err, Users) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(Users[0])
                }
            })
        })
    }
    updateUser = (editUser, id) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`UPDATE Users SET Username = '${editUser.Username}', Email = '${editUser.Email}', Password= '${editUser.Password}', Phone= '${editUser.Phone}', Address= '${editUser.Address}', Users.Image ='${editUser.Image}', Role = '${editUser.Role}' WHERE id = ${id}`, (err, updateUser) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(updateUser[0])
                }
            })
        })
    }


}

module.exports = new UserService();



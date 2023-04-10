const fs = require('fs');
const qs = require('qs')
const userService = require('../../service/userService');
const cookie = require('cookie');
const productService = require("../../service/productService");
const categoryService = require("../../service/categoryService");


class UserController {

    login = (req, res) => {

        if (req.method === 'GET') {
            fs.readFile('./view/user/login.html', 'utf-8', (err, loginHtml) => {
                res.write(loginHtml);
                res.end()
            })
        } else {
            let data = '';
            req.on('data', chuck => {
                data += chuck
            })
            req.on('end', async () => {
                let user = qs.parse(data);
                let account = await userService.getUser(user);
                if (account.length === 0) {
                    res.writeHead(301, {'location': '/'});
                    res.end()
                } else {
                    if (account[0].Role === 'Admin'){
                        res.setHeader('Set-Cookie', cookie.serialize('user', JSON.stringify(account[0]), {
                            httpOnly: true,
                            maxAge: 60 * 60 * 24 * 7
                        }));
                        res.writeHead(301, {'location': '/home'});
                        res.end()
                    } else if (account[0].Role === 'User'){
                        res.setHeader('Set-Cookie', cookie.serialize('user', JSON.stringify(account[0]), {
                            httpOnly: true,
                            maxAge: 60 * 60 * 24 * 7
                        }));
                        res.writeHead(301, {'location': '/showUserHome'});
                        res.end()
                    }
                }
            })
        }
    }
    register = (req, res) => {
        if (req.method === 'GET') {
            fs.readFile('./view/user/register.html', 'utf-8', (error, registerHtml) => {
                res.write(registerHtml);
                res.end()
            })
        } else {
            let register = '';
            req.on('data', chuck => {
                register += chuck
            })
            req.on('end', async () => {
                let user = qs.parse(register);
                await userService.postUser(user);
                res.writeHead(301, {'location': '/login'});
                res.end();

            });
        }
    }
    logout = (req, res) => {
      res.setHeader('Set-Cookie', ['user=; max-age=0']);
      res.writeHead(301, {'location': '/'});
      res.end()
    }

    detailUser = (req, res, id) =>{
        if(req.method === 'GET'){

            fs.readFile('./view/user/detailUser.html', 'utf-8',async (err, detailUser)=>{
                let userDetail = await userService.findByIdUser(id);

                detailUser = detailUser.replace('{Username}', userDetail.Username);
                detailUser = detailUser.replace('{Email}', userDetail.Email);
                detailUser = detailUser.replace('{Phone}', userDetail.Phone);
                detailUser = detailUser.replace('{Address}', userDetail.Address);
                detailUser = detailUser.replace('{Image}', userDetail.Image);

                res.write(detailUser);
                res.end();
            })
        }
    }
    updateUser = (req, res, id) => {
        if (req.method === 'GET') {
            fs.readFile('./view/user/updateUser.html', 'utf-8', async (err, updateHtml) => {

                let product = await userService.findByIdUser(id);

                updateHtml = updateHtml.replace('{Username}', product.Username);
                updateHtml = updateHtml.replace('{Email}', product.Email);
                updateHtml = updateHtml.replace('{Password}', product.Password);
                updateHtml = updateHtml.replace('{Phone}', product.Phone);
                updateHtml = updateHtml.replace('{Address}', product.Address);
                updateHtml = updateHtml.replace('{Image}', product.Image);
                updateHtml = updateHtml.replace('{Role}', product.Role);

                res.write(updateHtml);
                res.end();
            })
        } else {
            let updateUser = '';
            req.on('data', chunk => {
                updateUser += chunk
            })
            req.on('end', async () => {
                let edit = qs.parse(updateUser);
                await userService.updateUser(edit, id);
                res.writeHead(301, {'location': '/showUserHome'});
                res.end();

            });
        }
    }

}

module.exports = new UserController();

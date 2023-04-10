const fs = require('fs');
const productService = require("../../service/productService");
const userService = require("../../service/userService");
const cookie = require("cookie");
const qs = require("qs");


class ProductUserController {

    getHtmlUserProducts = (products, indexHtml) => {
        let productHtml = ''
        products.map(item => {
            productHtml += `
                       <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image})"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price}VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>
            `
        })
        indexHtml = indexHtml.replace('{product}', productHtml);
        return indexHtml;
    }


    pagingUserProduct = async (req, res, id) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            let page = id;
            let limit = 10
            let product = await productService.productPaging(page, limit);
            let indexHtml = fs.readFileSync('./view/indexUser.html', 'utf-8')
            let productHtml = ''
            product.map(item => {
                productHtml += `
            <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price} VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>
            `
            })
            indexHtml = indexHtml.replace('{product}', productHtml);
            indexHtml = this.getHtmlAccount(user, indexHtml);
            res.write(indexHtml)
            res.end()
        }
    }

    getHtmlAccount = (account, indexHtml) => {
        let accountHtml = '';
            accountHtml += `
            <tr>
                <li class="header__navbar-item header__navbar-user">
                        <img src="${account.Image}"
                             alt="" class="header__navbar-user-img">
                        <span class="header__navbar-user-name">${account.Username}</span>

                        <ul class="header__navbar-user-menu">
                            <li class="header__navbar-user-item">
                                <a href="/detailUser/${account.id}">Tài khoản của tôi</a>
                            </li>
                            <li class="header__navbar-user-item">
                                <a href="/updateUser/${account.id}">Sửa thông tin</a>
                            </li>
                            <li class="header__navbar-user-item">
                                <a href="">Đơn mua</a>
                            </li>
                            <li class="header__navbar-user-item header__navbar-user-item--separate">
                                <a href="/logout">Đăng xuất</a>
                            </li>
                        </ul>
                    </li>
            `;
        indexHtml = indexHtml.replace('{accounts}', accountHtml);
        return indexHtml;
    }

    showUserHome = (req, res, id) => {

        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);

            fs.readFile('./view/indexUser.html', 'utf-8', async (err, indexHtml) => {
                let page = id;
                let limit = 10
                let products = await productService.productPaging1(page, limit);
                indexHtml = this.getHtmlAccount(user, indexHtml);
                indexHtml = this.getHtmlUserProducts(products, indexHtml);
                res.write(indexHtml);
                res.end();
            })
        } else {
            res.writeHead(301, {location: '/'});
            res.end();
        }
    }

    sortUserDescendingProduct = async (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile('./view/indexUser.html', 'utf-8', async (err, indexHtml) => {
                let soft = await productService.productSortDescending();
                let productHtml = ''
                soft.map(item => {
                    productHtml += `
                 <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price} VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>
`
                })
                indexHtml = indexHtml.replace('{product}', productHtml);
                indexHtml = this.getHtmlAccount(user, indexHtml);
                res.write(indexHtml)
                res.end();
            })
        }
    }
    sortUserUpAscendingProduct = async (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile('./view/indexUser.html', 'utf-8', async (err, indexHtml) => {
                let soft2 = await productService.productSortUpAscending();
                let productHtml = ''
                soft2.map(item => {
                    productHtml += `
                 <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price} VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>
`
                })
                indexHtml = indexHtml.replace('{product}', productHtml);
                indexHtml = this.getHtmlAccount(user, indexHtml);
                res.write(indexHtml)
                res.end();
            })
        }
    }
    classifyUserProduct1 = async (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile('./view/indexUser.html', 'utf-8', async (err, indexHtml) => {
                let soft = await productService.productClassify1();
                let productHtml1 = ''
                soft.map(item => {
                    productHtml1 += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price} VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>`
                })
                indexHtml = indexHtml.replace('{product}', productHtml1);
                indexHtml = this.getHtmlAccount(user, indexHtml);
                res.write(indexHtml)
                res.end();
            })
        }
    }
    classifyUserProduct2 = async (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile('./view/indexUser.html', 'utf-8', async (err, indexHtml) => {
                let soft = await productService.productClassify2();
                let productHtml2 = ''
                soft.map(item => {
                    productHtml2 += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price} VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>`
                })
                indexHtml = indexHtml.replace('{product}', productHtml2);
                indexHtml = this.getHtmlAccount(user, indexHtml);
                res.write(indexHtml)
                res.end();
            })
        }
    }
    classifyUserProduct3 = async (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile('./view/indexUser.html', 'utf-8', async (err, indexHtml) => {
                let soft = await productService.productClassify3();
                let productHtml3 = ''
                soft.map(item => {
                    productHtml3 += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price} VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>`
                })
                indexHtml = indexHtml.replace('{product}', productHtml3);
                indexHtml = this.getHtmlAccount(user, indexHtml);
                res.write(indexHtml)
                res.end();
            })
        }
    }
    classifyUserProduct4 = async (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile('./view/indexUser.html', 'utf-8', async (err, indexHtml) => {
                let soft = await productService.productClassify4();
                let productHtml4 = ''
                soft.map(item => {
                    productHtml4 += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price} VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>`
                })
                indexHtml = indexHtml.replace('{product}', productHtml4);
                indexHtml = this.getHtmlAccount(user, indexHtml);
                res.write(indexHtml)
                res.end();
            })
        }
    }
    classifyUserProduct5 = async (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile('./view/indexUser.html', 'utf-8', async (err, indexHtml) => {
                let soft = await productService.productClassify5();
                let productHtml5 = ''
                soft.map(item => {
                    productHtml5 += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price} VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>`
                })
                indexHtml = indexHtml.replace('{product}', productHtml5);
                indexHtml = this.getHtmlAccount(user, indexHtml);
                res.write(indexHtml)
                res.end();
            })
        }
    }
    classifyUserProduct6 = async (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile('./view/indexUser.html', 'utf-8', async (err, indexHtml) => {
                let soft = await productService.productClassify6();
                let productHtml6 = ''
                soft.map(item => {
                    productHtml6 += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price} VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>`
                })
                indexHtml = indexHtml.replace('{product}', productHtml6);
                indexHtml = this.getHtmlAccount(user, indexHtml);
                res.write(indexHtml)
                res.end();
            })
        }
    }
    classifyUserProduct7 = async (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile('./view/indexUser.html', 'utf-8', async (err, indexHtml) => {
                let soft = await productService.productClassify7();
                let productHtml7 = ''
                soft.map(item => {
                    productHtml7 += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price} VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>`
                })
                indexHtml = indexHtml.replace('{product}', productHtml7);
                indexHtml = this.getHtmlAccount(user, indexHtml);
                res.write(indexHtml)
                res.end();
            })
        }
    }
    classifyUserProduct8 = async (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile('./view/indexUser.html', 'utf-8', async (err, indexHtml) => {
                let soft = await productService.productClassify8();
                let productHtml8 = ''
                soft.map(item => {
                    productHtml8 += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price} VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>`
                })
                indexHtml = indexHtml.replace('{product}', productHtml8);
                indexHtml = this.getHtmlAccount(user, indexHtml);
                res.write(indexHtml)
                res.end();
            })
        }
    }
    classifyUserProduct9 = async (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile('./view/indexUser.html', 'utf-8', async (err, indexHtml) => {
                let soft = await productService.productClassify9();
                let productHtml9 = ''
                soft.map(item => {
                    productHtml9 += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price} VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>`
                })
                indexHtml = indexHtml.replace('{product}', productHtml9);
                indexHtml = this.getHtmlAccount(user, indexHtml);
                res.write(indexHtml)
                res.end();
            })
        }
    }
    classifyUserProduct10 = async (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile('./view/indexUser.html', 'utf-8', async (err, indexHtml) => {
                let soft = await productService.productClassify10();
                let productHtml10 = ''
                soft.map(item => {
                    productHtml10 += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price} VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>`
                })
                indexHtml = indexHtml.replace('{product}', productHtml10);
                indexHtml = this.getHtmlAccount(user, indexHtml);
                res.write(indexHtml)
                res.end();
            })
        }
    }
    classifyUserProduct11 = async (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile('./view/indexUser.html', 'utf-8', async (err, indexHtml) => {
                let soft = await productService.productClassify11();
                let productHtml11 = ''
                soft.map(item => {
                    productHtml11 += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price} VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>`
                })
                indexHtml = indexHtml.replace('{product}', productHtml11);
                indexHtml = this.getHtmlAccount(user, indexHtml);
                res.write(indexHtml)
                res.end();
            })
        }
    }

    searchUserProduct = (req, res)=>{
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);

            let searchUserProduct = '';
            req.on('data', chunk => {
                searchUserProduct += chunk
            })
            req.on('end', async () => {
                fs.readFile('./view/indexUser.html', 'utf-8', async (err, indexHtml) => {
                    let dataForm = qs.parse(searchUserProduct);
                    let param = dataForm.search;
                    let product = await productService.productSearch(param);
                    let productHtml = ''
                    product.map(item => {
                        productHtml += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showUserDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
                                    <h4 class="home-product-item__name">${item.ProductName}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${item.Price} VNĐ</span>
                                    </div>
                                    <div class="home-product-item__action">
                                            <span class="home-product-item__like">
                                                <i class="home-product-item__like-icon-empty fa-solid fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fa-regular fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="home-product-item_origin">
                                        <span class="home-product-item__brand">Whoo</span>
                                        <span class="home-product-item_origin-name">${item.origin}</span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fa-solid fa-check"></i>
                                        <span>Yêu thích</span>

                                    </div>
                                    <div class="home-product-item_sale-off">
                                        <span class="home-product-item_sale-off-percent">${item.discount}%</span>
                                        <span class="home-product-item_sale-off-label">Giảm</span>
                                    </div>
                                </a>
                            </div>`
                    })
                    indexHtml = indexHtml.replace('{product}', productHtml);
                    indexHtml = this.getHtmlAccount(user, indexHtml);
                    res.write(indexHtml)
                    res.end();
                })
            })
        }
    }

    showUserDetail = (req, res, id) => {


        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);

            if (req.method === 'GET') {
                fs.readFile('./view/product/detailProduct.html', 'utf-8', async (err, UserDetail) => {
                    let product = await productService.findById(id);

                    UserDetail = UserDetail.replace('{ProductName}', product.ProductName);
                    UserDetail = UserDetail.replace('{Price}', product.Price);
                    UserDetail = UserDetail.replace('{Quantity}', product.Quantity);
                    UserDetail = UserDetail.replace('{productDescription}', product.productDescription);
                    UserDetail = UserDetail.replace('{discount}', product.discount);
                    UserDetail = UserDetail.replace('{origin}', product.origin);
                    UserDetail = UserDetail.replace('{Image}', product.Image);

                    UserDetail = this.getHtmlAccount(user, UserDetail);
                    res.write(UserDetail);
                    res.end();
                })
            }
        }
    }

}

module.exports = new ProductUserController();
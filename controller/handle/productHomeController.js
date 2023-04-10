const fs = require('fs');
const qs = require('qs')
const userService = require('../../service/userService');
const cookie = require('cookie');
const productService = require("../../service/productService");


class ProductHomeController {
    homeHtml = (products, indexHtml) => {
        let productHtml = ''
        products.map(item => {
            productHtml += `
                       <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showHomeDetail/${item.id}">
                                    <div class="home-product-item__img"
                                         style="background-image:url(${item.Image});"></div>
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
        indexHtml = indexHtml.replace('{homeProduct}', productHtml);
        return indexHtml;
    }
    home = (req, res) => {
        fs.readFile('./view/home.html', 'utf-8', async (error, indexHtml) => {
            let products = await productService.findAll();
            indexHtml = this.homeHtml(products, indexHtml);
            res.write(indexHtml);
            res.end();
        })
    }

    sortHomeDescendingProduct = async (req, res) => {
        fs.readFile('./view/home.html', 'utf-8', async (error, indexHtml) => {
            let soft = await productService.productSortDescending();
            let productHtml = ''
            soft.map(item => {
                productHtml += `
                 <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showHomeDetail/${item.id}">
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
            indexHtml = indexHtml.replace('{homeProduct}', productHtml);
            res.write(indexHtml)
            res.end();
        })

    }
    sortHomeUpAscendingProduct = async (req, res) => {
        fs.readFile('./view/home.html', 'utf-8', async (error, indexHtml) => {
            let soft2 = await productService.productSortUpAscending();
            let productHtml = ''
            soft2.map(item => {
                productHtml += `
                 <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showHomeDetail/${item.id}">
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
            indexHtml = indexHtml.replace('{homeProduct}', productHtml);
            res.write(indexHtml)
            res.end();
        })
    }
    classifyHomeProduct1 = async (req, res) => {
        fs.readFile('./view/home.html', 'utf-8', async (error, indexHtml) => {
            let soft = await productService.productClassify1();
            let productHtml = ''
            soft.map(item => {
                productHtml += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showHomeDetail/${item.id}">
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
            indexHtml = indexHtml.replace('{homeProduct}', productHtml);
            res.write(indexHtml)
            res.end();
        })
    }
    classifyHomeProduct2 = async (req, res) => {
        fs.readFile('./view/home.html', 'utf-8', async (error, indexHtml) => {
            let soft = await productService.productClassify2();
            let productHtml = ''
            soft.map(item => {
                productHtml += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showHomeDetail/${item.id}">
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
            indexHtml = indexHtml.replace('{homeProduct}', productHtml);
            res.write(indexHtml)
            res.end();
        })
    }
    classifyHomeProduct3 = async (req, res) => {
        fs.readFile('./view/home.html', 'utf-8', async (error, indexHtml) => {
            let soft = await productService.productClassify3();
            let productHtml = ''
            soft.map(item => {
                productHtml += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showHomeDetail/${item.id}">
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
            indexHtml = indexHtml.replace('{homeProduct}', productHtml);
            res.write(indexHtml)
            res.end();
        })
    }
    classifyHomeProduct4 = async (req, res) => {
        fs.readFile('./view/home.html', 'utf-8', async (error, indexHtml) => {
            let soft = await productService.productClassify4();
            let productHtml = ''
            soft.map(item => {
                productHtml += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showHomeDetail/${item.id}">
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
            indexHtml = indexHtml.replace('{homeProduct}', productHtml);
            res.write(indexHtml)
            res.end();
        })
    }
    classifyHomeProduct5 = async (req, res) => {
        fs.readFile('./view/home.html', 'utf-8', async (error, indexHtml) => {
            let soft = await productService.productClassify5();
            let productHtml = ''
            soft.map(item => {
                productHtml += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showHomeDetail/${item.id}">
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
            indexHtml = indexHtml.replace('{homeProduct}', productHtml);
            res.write(indexHtml)
            res.end();
        })
    }
    classifyHomeProduct6 = async (req, res) => {
        fs.readFile('./view/home.html', 'utf-8', async (error, indexHtml) => {
            let soft = await productService.productClassify6();
            let productHtml = ''
            soft.map(item => {
                productHtml += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showHomeDetail/${item.id}">
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
            indexHtml = indexHtml.replace('{homeProduct}', productHtml);
            res.write(indexHtml)
            res.end();
        })
    }
    classifyHomeProduct7 = async (req, res) => {
        fs.readFile('./view/home.html', 'utf-8', async (error, indexHtml) => {
            let soft = await productService.productClassify7();
            let productHtml = ''
            soft.map(item => {
                productHtml += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showHomeDetail/${item.id}">
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
            indexHtml = indexHtml.replace('{homeProduct}', productHtml);
            res.write(indexHtml)
            res.end();
        })
    }
    classifyHomeProduct8 = async (req, res) => {
        fs.readFile('./view/home.html', 'utf-8', async (error, indexHtml) => {
            let soft = await productService.productClassify8();
            let productHtml = ''
            soft.map(item => {
                productHtml += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showHomeDetail/${item.id}">
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
            indexHtml = indexHtml.replace('{homeProduct}', productHtml);
            res.write(indexHtml)
            res.end();
        })
    }
    classifyHomeProduct9 = async (req, res) => {
        fs.readFile('./view/home.html', 'utf-8', async (error, indexHtml) => {
            let soft = await productService.productClassify9();
            let productHtml = ''
            soft.map(item => {
                productHtml += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showHomeDetail/${item.id}">
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
            indexHtml = indexHtml.replace('{homeProduct}', productHtml);
            res.write(indexHtml)
            res.end();
        })
    }
    classifyHomeProduct10 = async (req, res) => {
        fs.readFile('./view/home.html', 'utf-8', async (error, indexHtml) => {
            let soft = await productService.productClassify10();
            let productHtml = ''
            soft.map(item => {
                productHtml += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showHomeDetail/${item.id}">
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
            indexHtml = indexHtml.replace('{homeProduct}', productHtml);
            res.write(indexHtml)
            res.end();
        })
    }
    classifyHomeProduct11 = async (req, res) => {
        fs.readFile('./view/home.html', 'utf-8', async (error, indexHtml) => {
            let soft = await productService.productClassify11();
            let productHtml = ''
            soft.map(item => {
                productHtml += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showHomeDetail/${item.id}">
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
            indexHtml = indexHtml.replace('{homeProduct}', productHtml);
            res.write(indexHtml)
            res.end();
        })
    }

    searchHomeProduct = (req, res)=>{
        let searchUserProduct = '';
        req.on('data', chunk => {
            searchUserProduct += chunk
        })
        req.on('end', async () => {
            fs.readFile('./view/home.html', 'utf-8', async (error, indexHtml) => {
                let dataForm = qs.parse(searchUserProduct);
                let param = dataForm.search;
                let product = await productService.productSearch(param);
                let productHtml = ''
                product.map(item => {
                    productHtml += `
                <div class="grid__column-2-4">
                                <a class="home-product-item" href="/showHomeDetail/${item.id}">
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
                indexHtml = indexHtml.replace('{homeProduct}', productHtml);
                res.write(indexHtml)
                res.end();
            })
        })
    }


    showHomeDetail = (req, res, id) => {
        if (req.method === 'GET') {
            fs.readFile('./view/product/detailHomeProduct.html', 'utf-8', async (error, HomeDetail) => {
                let product = await productService.findById(id);
                
                HomeDetail = HomeDetail.replace('{ProductName}', product.ProductName);
                HomeDetail = HomeDetail.replace('{Price}', product.Price);
                HomeDetail = HomeDetail.replace('{Quantity}', product.Quantity);
                HomeDetail = HomeDetail.replace('{productDescription}', product.productDescription);
                HomeDetail = HomeDetail.replace('{discount}', product.discount);
                HomeDetail = HomeDetail.replace('{origin}', product.origin);
                HomeDetail = HomeDetail.replace('{Image}', product.Image);
                res.write(HomeDetail);
                res.end();
            })
        }
    }

}


module.exports = new ProductHomeController();
const fs = require('fs')
const productService = require('../../service/productService');
const categoryService = require('../../service/categoryService');
const cookie = require('cookie')
const qs = require("qs");

class ProductAdminController {
    getHtmlProducts = (products, indexHtml) => {
        let productHtml = ''
        products.map(item => {
            productHtml += `
            <tr>
                <td>${item.ProductName}</td>
                <td>${item.Price}</td>
                <td>${item.Quantity}</td>
                <td>${item.discount}</td>
                <td>${item.origin}</td>
                <td>${item.productDescription}</td>
                <td><img width="150" height="150" src="${item.Image}"></td>
                <td><a type="button" class="btn btn-primary" href="/edit/${item.id}">Sửa</a></td>
                <td><a   onclick=" return confirm('Bạn chắc chắn muốn xóa sản phẩm này?')"   type="button" class="btn btn-danger" href="/delete/${item.id}">Xóa</a></td>
            </tr>
            `
        })
        indexHtml = indexHtml.replace('{products}', productHtml);
        return indexHtml;
    }


    pagingProduct = async (req, res, id) =>{
        let page = id;
        let limit = 3
        let products =  await productService.productPaging(page, limit);
        let indexHtml = fs.readFileSync('./view/indexAdmin.html', 'utf-8')
        let productHtml = ''
        products.map(item => {
            productHtml += `
            <tr>
                <td>${item.ProductName}</td>
                <td>${item.Price}</td>
                <td>${item.Quantity}</td>
                <td>${item.discount}</td>
                <td>${item.origin}</td>
                <td>${item.productDescription}</td>
                <td><img width="150" height="150" src="${item.Image}"></td>
                <td><a type="button" class="btn btn-primary" href="/edit/${item.id}">Sửa</a></td>
                <td><a   onclick=" return confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')"   type="button" class="btn btn-danger" href="/delete/${item.id}">Xóa</a></td>
            </tr>
            `
        })
        indexHtml = indexHtml.replace('{products}', productHtml);
        res.write(indexHtml)
        res.end()
    }


    showHome = (req, res, id) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile('./view/indexAdmin.html', 'utf-8', async (err, indexHtml) => {
                let page = id;
                let limit = 3
                let products = await productService.productPaging(page, limit);
                indexHtml = this.getHtmlProducts(products, indexHtml);
                res.write(indexHtml);
                res.end();
            })
        } else {
            res.writeHead(301, {location: '/'});
            res.end();
        }
    }

    editProduct = (req, res, id) => {
        if (req.method === 'GET') {
            fs.readFile('./view/product/edit.html', 'utf-8', async (err, editHtml) => {

                let product = await productService.findById(id);
                let categories = await categoryService.findAll();

                editHtml = editHtml.replace('{ProductName}', product.ProductName);
                editHtml = editHtml.replace('{Price}', product.Price);
                editHtml = editHtml.replace('{Quantity}', product.Quantity);
                editHtml = editHtml.replace('{discount}', product.discount);
                editHtml = editHtml.replace('{origin}', product.origin);
                editHtml = editHtml.replace('{productDescription}', product.productDescription);
                editHtml = editHtml.replace('{Image}', product.Image);
                let htmlCategory = '';
                categories.map(item => {
                    htmlCategory += `<option value="${item.id}">${item.CategoryName}</option>`
                })
                editHtml = editHtml.replace('{categories}', htmlCategory);
                res.write(editHtml);
                res.end();
            })
        } else {
            let editProduct = '';
            req.on('data', chunk => {
                editProduct += chunk
            })
            req.on('end', async () => {
                let edit = qs.parse(editProduct);
                await productService.updateProduct(edit, id);
                res.writeHead(301, {'location': '/home'});
                res.end();

            });
        }
    }
    createProduct = (req, res) => {
        if (req.method === 'GET') {
            fs.readFile('./view/product/create.html', 'utf-8', (err, createHtml) => {
                res.write(createHtml);
                res.end()
            })
        } else {
            let create = '';
            req.on('data', chuck => {
                create += chuck
            })
            req.on('end', async () => {
                let user = qs.parse(create);
                await productService.createProduct(user);
                res.writeHead(301, {'location': '/home'});
                res.end();

            });
        }
    }
    spliceProduct = async (req, res, id) => {
        let pd = await productService.productDelete(id);
        res.writeHead(301, {'location': '/home'});
        res.end();
    }

    searchProduct = (req, res)=>{
        let searchProduct = '';
        req.on('data', chunk => {
            searchProduct += chunk
        })
        req.on('end', async () => {
            fs.readFile('./view/indexAdmin.html', 'utf-8', async (err, indexHtml) => {
                let dataForm = qs.parse(searchProduct);
                let param = dataForm.search;
                let product = await productService.productSearch(param);
                let productHtml = ''
                    product.map(item => {
                        productHtml += `
                <tr>
                    <td>${item.ProductName}</td>
                    <td>${item.Price}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.discount}</td>
                    <td>${item.origin}</td>
                    <td>${item.productDescription}</td>
                    <td><img width="150" height="150" src="${item.Image}"></td>
                </tr>`
                })
                indexHtml = indexHtml.replace('{products}', productHtml);
                res.write(indexHtml)
                res.end();
            })
        })
    }

    sortDescendingProduct = async (req, res) => {
        fs.readFile('./view/indexAdmin.html', 'utf-8', async (err, indexHtml) => {
            let soft = await productService.productSortDescending();
            let productHtml12 = ''
            soft.map(item => {
                productHtml12 += `
                <tr>
                    <td>${item.ProductName}</td>
                    <td>${item.Price}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.discount}</td>
                    <td>${item.origin}</td>
                    <td>${item.productDescription}</td>
                    <td><img width="150" height="150" src="${item.Image}"></td>
                </tr>`
            })
            indexHtml = indexHtml.replace('{products}', productHtml12);
            res.write(indexHtml)
            res.end();
        })

    }
    sortUpAscendingProduct = async (req, res) => {
        fs.readFile('./view/indexAdmin.html', 'utf-8', async (err, indexHtml) => {
            let soft2 = await productService.productSortUpAscending();
            let productHtml = ''
            soft2.map(item => {
                productHtml += `
                <tr>
                    <td>${item.ProductName}</td>
                    <td>${item.Price}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.discount}</td>
                    <td>${item.origin}</td>
                    <td>${item.productDescription}</td>
                    <td><img width="150" height="150" src="${item.Image}"></td>
                </tr>`
            })
            indexHtml = indexHtml.replace('{products}', productHtml);
            res.write(indexHtml)
            res.end();
        })

    }
    classifyProduct1 = async (req, res) => {
        fs.readFile('./view/indexAdmin.html', 'utf-8', async (err, indexHtml) => {
            let soft = await productService.productClassify1();
            let productHtml13 = ''
            soft.map(item => {
                productHtml13 += `
                <tr>
                    <td>${item.ProductName}</td>
                    <td>${item.Price}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.discount}</td>
                    <td>${item.origin}</td>
                    <td>${item.productDescription}</td>
                    <td><img width="150" height="150" src="${item.Image}"></td>
                    <td><a type="button" class="btn btn-primary" href="/edit/${item.id}">Sửa</a></td>
                <td><a   onclick=" return confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')"   type="button" class="btn btn-danger" href="/delete/${item.id}">Xóa</a></td>
                </tr>`
            })
            indexHtml = indexHtml.replace('{products}', productHtml13);
            res.write(indexHtml)
            res.end();
        })

    }
    classifyProduct2 = async (req, res) => {
        fs.readFile('./view/indexAdmin.html', 'utf-8', async (err, indexHtml) => {
            let soft = await productService.productClassify2();
            let productHtml14 = ''
            soft.map(item => {
                productHtml14 += `
                <tr>
                    <td>${item.ProductName}</td>
                    <td>${item.Price}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.discount}</td>
                    <td>${item.origin}</td>
                    <td>${item.productDescription}</td>
                    <td><img width="150" height="150" src="${item.Image}"></td>
                    <td><a type="button" class="btn btn-primary" href="/edit/${item.id}">Sửa</a></td>
                <td><a   onclick=" return confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')"   type="button" class="btn btn-danger" href="/delete/${item.id}">Xóa</a></td>
                </tr>`
            })
            indexHtml = indexHtml.replace('{products}', productHtml14);
            res.write(indexHtml)
            res.end();
        })

    }
    classifyProduct3 = async (req, res) => {
        fs.readFile('./view/indexAdmin.html', 'utf-8', async (err, indexHtml) => {
            let soft = await productService.productClassify3();
            let productHtml15 = ''
            soft.map(item => {
                productHtml15 += `
                <tr>
                    <td>${item.ProductName}</td>
                    <td>${item.Price}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.discount}</td>
                    <td>${item.origin}</td>
                    <td>${item.productDescription}</td>
                    <td><img width="150" height="150" src="${item.Image}"></td>
                    <td><a type="button" class="btn btn-primary" href="/edit/${item.id}">Sửa</a></td>
                <td><a   onclick=" return confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')"   type="button" class="btn btn-danger" href="/delete/${item.id}">Xóa</a></td>
                </tr>`
            })
            indexHtml = indexHtml.replace('{products}', productHtml15);
            res.write(indexHtml)
            res.end();
        })

    }
    classifyProduct4 = async (req, res) => {
        fs.readFile('./view/indexAdmin.html', 'utf-8', async (err, indexHtml) => {
            let soft = await productService.productClassify4();
            let productHtml16 = ''
            soft.map(item => {
                productHtml16 += `
                <tr>
                    <td>${item.ProductName}</td>
                    <td>${item.Price}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.discount}</td>
                    <td>${item.origin}</td>
                    <td>${item.productDescription}</td>
                    <td><img width="150" height="150" src="${item.Image}"></td>
                    <td><a type="button" class="btn btn-primary" href="/edit/${item.id}">Sửa</a></td>
                <td><a   onclick=" return confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')"   type="button" class="btn btn-danger" href="/delete/${item.id}">Xóa</a></td>
                </tr>`
            })
            indexHtml = indexHtml.replace('{products}', productHtml16);
            res.write(indexHtml)
            res.end();
        })

    }
    classifyProduct5 = async (req, res) => {
        fs.readFile('./view/indexAdmin.html', 'utf-8', async (err, indexHtml) => {
            let soft = await productService.productClassify5();
            let productHtml17 = ''
            soft.map(item => {
                productHtml17 += `
                <tr>
                    <td>${item.ProductName}</td>
                    <td>${item.Price}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.discount}</td>
                    <td>${item.origin}</td>
                    <td>${item.productDescription}</td>
                    <td><img width="150" height="150" src="${item.Image}"></td>
                    <td><a type="button" class="btn btn-primary" href="/edit/${item.id}">Sửa</a></td>
                <td><a   onclick=" return confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')"   type="button" class="btn btn-danger" href="/delete/${item.id}">Xóa</a></td>
                </tr>`
            })
            indexHtml = indexHtml.replace('{products}', productHtml17);
            res.write(indexHtml)
            res.end();
        })

    }
    classifyProduct6 = async (req, res) => {
        fs.readFile('./view/indexAdmin.html', 'utf-8', async (err, indexHtml) => {
            let soft = await productService.productClassify6();
            let productHtml18 = ''
            soft.map(item => {
                productHtml18 += `
                <tr>
                    <td>${item.ProductName}</td>
                    <td>${item.Price}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.discount}</td>
                    <td>${item.origin}</td>
                    <td>${item.productDescription}</td>
                    <td><img width="150" height="150" src="${item.Image}"></td>
                    <td><a type="button" class="btn btn-primary" href="/edit/${item.id}">Sửa</a></td>
                <td><a   onclick=" return confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')"   type="button" class="btn btn-danger" href="/delete/${item.id}">Xóa</a></td>
                </tr>`
            })
            indexHtml = indexHtml.replace('{products}', productHtml18);
            res.write(indexHtml)
            res.end();
        })

    }
    classifyProduct7 = async (req, res) => {
        fs.readFile('./view/indexAdmin.html', 'utf-8', async (err, indexHtml) => {
            let soft = await productService.productClassify7();
            let productHtml19 = ''
            soft.map(item => {
                productHtml19 += `
                <tr>
                    <td>${item.ProductName}</td>
                    <td>${item.Price}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.discount}</td>
                    <td>${item.origin}</td>
                    <td>${item.productDescription}</td>
                    <td><img width="150" height="150" src="${item.Image}"></td>
                    <td><a type="button" class="btn btn-primary" href="/edit/${item.id}">Sửa</a></td>
                <td><a   onclick=" return confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')"   type="button" class="btn btn-danger" href="/delete/${item.id}">Xóa</a></td>
                </tr>`
            })
            indexHtml = indexHtml.replace('{products}', productHtml19);
            res.write(indexHtml)
            res.end();
        })

    }
    classifyProduct8 = async (req, res) => {
        fs.readFile('./view/indexAdmin.html', 'utf-8', async (err, indexHtml) => {
            let soft = await productService.productClassify8();
            let productHtml20 = ''
            soft.map(item => {
                productHtml20 += `
                <tr>
                    <td>${item.ProductName}</td>
                    <td>${item.Price}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.discount}</td>
                    <td>${item.origin}</td>
                    <td>${item.productDescription}</td>
                    <td><img width="150" height="150" src="${item.Image}"></td>
                    <td><a type="button" class="btn btn-primary" href="/edit/${item.id}">Sửa</a></td>
                <td><a   onclick=" return confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')"   type="button" class="btn btn-danger" href="/delete/${item.id}">Xóa</a></td>
                </tr>`
            })
            indexHtml = indexHtml.replace('{products}', productHtml20);
            res.write(indexHtml)
            res.end();
        })

    }
    classifyProduct9 = async (req, res) => {
        fs.readFile('./view/indexAdmin.html', 'utf-8', async (err, indexHtml) => {
            let soft = await productService.productClassify9();
            let productHtml21 = ''
            soft.map(item => {
                productHtml21 += `
                <tr>
                    <td>${item.ProductName}</td>
                    <td>${item.Price}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.discount}</td>
                    <td>${item.origin}</td>
                    <td>${item.productDescription}</td>
                    <td><img width="150" height="150" src="${item.Image}"></td>
                    <td><a type="button" class="btn btn-primary" href="/edit/${item.id}">Sửa</a></td>
                <td><a   onclick=" return confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')"   type="button" class="btn btn-danger" href="/delete/${item.id}">Xóa</a></td>
                </tr>`
            })
            indexHtml = indexHtml.replace('{products}', productHtml21);
            res.write(indexHtml)
            res.end();
        })

    }
    classifyProduct10 = async (req, res) => {
        fs.readFile('./view/indexAdmin.html', 'utf-8', async (err, indexHtml) => {
            let soft = await productService.productClassify10();
            let productHtml22 = ''
            soft.map(item => {
                productHtml22 += `
                <tr>
                    <td>${item.ProductName}</td>
                    <td>${item.Price}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.discount}</td>
                    <td>${item.origin}</td>
                    <td>${item.productDescription}</td>
                    <td><img width="150" height="150" src="${item.Image}"></td>
                    <td><a type="button" class="btn btn-primary" href="/edit/${item.id}">Sửa</a></td>
                <td><a   onclick=" return confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')"   type="button" class="btn btn-danger" href="/delete/${item.id}">Xóa</a></td>
                </tr>`
            })
            indexHtml = indexHtml.replace('{products}', productHtml22);
            res.write(indexHtml)
            res.end();
        })

    }
    classifyProduct11 = async (req, res) => {
        fs.readFile('./view/indexAdmin.html', 'utf-8', async (err, indexHtml) => {
            let soft = await productService.productClassify11();
            let productHtml23 = ''
            soft.map(item => {
                productHtml23 += `
                <tr>
                    <td>${item.ProductName}</td>
                    <td>${item.Price}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.discount}</td>
                    <td>${item.origin}</td>
                    <td>${item.productDescription}</td>
                    <td><img width="150" height="150" src="${item.Image}"></td>
                    <td><a type="button" class="btn btn-primary" href="/edit/${item.id}">Sửa</a></td>
                <td><a   onclick=" return confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')"   type="button" class="btn btn-danger" href="/delete/${item.id}">Xóa</a></td>
                </tr>`
            })
            indexHtml = indexHtml.replace('{products}', productHtml23);
            res.write(indexHtml)
            res.end();
        })

    }



}

module.exports = new ProductAdminController();


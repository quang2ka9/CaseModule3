const connection = require('../entity/connection');

class ProductService {
    connect;

    constructor() {
        connection.connectToMySQL();
        this.connect = connection.getConnection();
    }

    findAll = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select * from product;`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }

    findById = (id) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select * from product where product.id = ${id}`, (err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product[0])
                }
            })
        })
    }
    updateProduct = (editProduct, id) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`UPDATE Product SET ProductName = '${editProduct.ProductName}', Price = '${editProduct.Price}', Quantity= '${editProduct.Quantity}', discount= '${editProduct.discount}', origin= '${editProduct.origin}', productDescription ='${editProduct.productDescription}', Image = '${editProduct.Image}', categoryId = '${editProduct.categoryId}' WHERE id = ${id}`, (err, updateProducts) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(updateProducts[0])
                }
            })
        })
    }
    createProduct = (add) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`insert into Product (ProductName, Price, Quantity, productDescription,discount,origin, Image, categoryId) value ('${add.ProductName}',${add.Price},${add.Quantity},'${add.productDescription}', ${add.discount}, '${add.origin}', '${add.Image}',${add.categoryId});`, (err, addProduct) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(addProduct)
                }
            })
        })
    }
    productDelete = (id) => {
        return new Promise((resolve, reject)=>{
            this.connect.query(`DELETE FROM cart WHERE productId = ${id};`,(error) =>{
                if (error) {
                    console.log(error)
                } else {
                    this.connect.query(`DELETE FROM product WHERE id = ${id};`,(err, deleteProduct)=>{
                        if (err) {
                            reject(err)
                        } else {
                            resolve(deleteProduct)
                        }
                    })
                }
            })
        })
    }
    productSearch = (value) =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`SELECT * FROM product WHERE ProductName  like '%${value}%';`,(err, search)=>{
                if (err) {
                    reject(err)
                } else {
                    resolve(search)
                }
            })
        })
    }
    productSortDescending = () =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`select * from product order by price desc;`,(err, softDescending)=>{
                if (err) {
                    reject(err)
                } else {
                    resolve(softDescending)
                }
            })
        })
    }
    productSortUpAscending = () =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`select * from product order by price asc;`,(err, softAscending)=>{
                if (err) {
                    reject(err)
                } else {
                    resolve(softAscending)
                }
            })
        })
    }
    productPaging = (page, limit) =>{
        if (!page) {
            page = 1;
        }
        return new Promise((resolve, reject)=>{
            const offset = (page - 1) * limit;
            this.connect.query(`SELECT * FROM product LIMIT ${limit} OFFSET ${offset};`, (err,paging )=>{
                if (err) {
                    reject(err)
                } else {
                    resolve(paging)
                }
            })
        })
    }



    productPaging1 = (page1, limit1) =>{
        if (!page1) {
            page1 = 1;
        }
        return new Promise((resolve, reject)=>{
            const offset1 = (page1 - 1) * limit1;
            this.connect.query(`SELECT * FROM product LIMIT ${limit1} OFFSET ${offset1};`, (err,paging )=>{
                if (err) {
                    reject(err)
                } else {
                    resolve(paging)
                }
            })
        })
    }


    productClassify1 = () =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`select * from product where categoryId = 1;`,(err1, classifyProduct1 )=>{
                if (err1) {
                    reject(err1)
                } else {
                    resolve(classifyProduct1)
                }
            })
        })
    }
    productClassify2 = () =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`select * from product where categoryId = 2;`,(err2, classifyProduct2 )=>{
                if (err2) {
                    reject(err2)
                } else {
                    resolve(classifyProduct2)
                }
            })
        })
    }
    productClassify3 = () =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`select * from product where categoryId = 3;`,(err3, classifyProduct3 )=>{
                if (err3) {
                    reject(err3)
                } else {
                    resolve(classifyProduct3)
                }
            })
        })
    }
    productClassify4 = () =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`select * from product where categoryId = 4;`,(err4, classifyProduct4 )=>{
                if (err4) {
                    reject(err4)
                } else {
                    resolve(classifyProduct4)
                }
            })
        })
    }
    productClassify5 = () =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`select * from product where categoryId = 5;`,(err5, classifyProduct5 )=>{
                if (err5) {
                    reject(err5)
                } else {
                    resolve(classifyProduct5)
                }
            })
        })
    }
    productClassify6 = () =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`select * from product where categoryId = 6;`,(err6, classifyProduct6 )=>{
                if (err6) {
                    reject(err6)
                } else {
                    resolve(classifyProduct6)
                }
            })
        })
    }
    productClassify7 = () =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`select * from product where categoryId = 7;`,(err7, classifyProduct7 )=>{
                if (err7) {
                    reject(err7)
                } else {
                    resolve(classifyProduct7)
                }
            })
        })
    }
    productClassify8 = () =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`select * from product where categoryId = 8;`,(err8, classifyProduct8 )=>{
                if (err8) {
                    reject(err8)
                } else {
                    resolve(classifyProduct8)
                }
            })
        })
    }
    productClassify9 = () =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`select * from product where categoryId = 9;`,(err9, classifyProduct9 )=>{
                if (err9) {
                    reject(err9)
                } else {
                    resolve(classifyProduct9)
                }
            })
        })
    }
    productClassify10 = () =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`select * from product where categoryId = 10;`,(err10, classifyProduct10 )=>{
                if (err10) {
                    reject(err10)
                } else {
                    resolve(classifyProduct10)
                }
            })
        })
    }
    productClassify11 = () =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`select * from product where categoryId = 11;`,(err11, classifyProduct11 )=>{
                if (err11) {
                    reject(err11)
                } else {
                    resolve(classifyProduct11)
                }
            })
        })
    }
}





module.exports = new ProductService();
const productAdminController = require('./handle/productAdminController')
const userController = require('./handle/userController');
const productUserController = require('./handle/productUserController');
const productHomeController = require('./handle/productHomeController');


const router = {
    "home": productAdminController.showHome,
    "edit": productAdminController.editProduct,
    "create": productAdminController.createProduct,
    "delete": productAdminController.spliceProduct,
    "search": productAdminController.searchProduct,
    "arrange": productAdminController.sortDescendingProduct,
    "arrange2": productAdminController.sortUpAscendingProduct,
    "paging": productAdminController.pagingProduct,
    "homeUser": productUserController.showUserHome,
    "classify1": productAdminController.classifyProduct1,
    "classify2": productAdminController.classifyProduct2,
    "classify3": productAdminController.classifyProduct3,
    "classify4": productAdminController.classifyProduct4,
    "classify5": productAdminController.classifyProduct5,
    "classify6": productAdminController.classifyProduct6,
    "classify7": productAdminController.classifyProduct7,
    "classify8": productAdminController.classifyProduct8,
    "classify9": productAdminController.classifyProduct9,
    "classify10": productAdminController.classifyProduct10,
    "classify11": productAdminController.classifyProduct11,

    "showUserHome": productUserController.showUserHome,
    "pagingUserProduct": productUserController.pagingUserProduct,
    "sortUserDescendingProduct": productUserController.sortUserDescendingProduct,
    "sortUserUpAscendingProduct": productUserController.sortUserUpAscendingProduct,
    "classifyUserProduct1": productUserController.classifyUserProduct1,
    "classifyUserProduct2": productUserController.classifyUserProduct2,
    "classifyUserProduct3": productUserController.classifyUserProduct3,
    "classifyUserProduct4": productUserController.classifyUserProduct4,
    "classifyUserProduct5": productUserController.classifyUserProduct5,
    "classifyUserProduct6": productUserController.classifyUserProduct6,
    "classifyUserProduct7": productUserController.classifyUserProduct7,
    "classifyUserProduct8": productUserController.classifyUserProduct8,
    "classifyUserProduct9": productUserController.classifyUserProduct9,
    "classifyUserProduct10": productUserController.classifyUserProduct10,
    "classifyUserProduct11": productUserController.classifyUserProduct11,
    "searchUserProduct": productUserController.searchUserProduct,
    "showUserDetail": productUserController.showUserDetail,


    "": productHomeController.home,
    "sortHomeDescendingProduct": productHomeController.sortHomeDescendingProduct,
    "sortHomeUpAscendingProduct": productHomeController.sortHomeUpAscendingProduct,
    "classifyHomeProduct1": productHomeController.classifyHomeProduct1,
    "classifyHomeProduct2": productHomeController.classifyHomeProduct2,
    "classifyHomeProduct3": productHomeController.classifyHomeProduct3,
    "classifyHomeProduct4": productHomeController.classifyHomeProduct4,
    "classifyHomeProduct5": productHomeController.classifyHomeProduct5,
    "classifyHomeProduct6": productHomeController.classifyHomeProduct6,
    "classifyHomeProduct7": productHomeController.classifyHomeProduct7,
    "classifyHomeProduct8": productHomeController.classifyHomeProduct8,
    "classifyHomeProduct9": productHomeController.classifyHomeProduct9,
    "classifyHomeProduct10": productHomeController.classifyHomeProduct10,
    "classifyHomeProduct11": productHomeController.classifyHomeProduct11,
    "searchHomeProduct": productHomeController.searchHomeProduct,
    "showHomeDetail": productHomeController.showHomeDetail,


    "detailUser": userController.detailUser,
    "updateUser": userController.updateUser,


    "register": userController.register,
    "login": userController.login,
    "logout": userController.logout,
};

module.exports = router;
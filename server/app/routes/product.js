const productController = require("./../../app/controllers/productController");
const appConfig = require("./../../config/appConfig")
const auth =require("./../middlewares/auth")


let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/products`;

    // defining routes.

    app.get(baseUrl+'/all',productController.getAllProduct)

    app.get(baseUrl+'/view/:id',productController.viewByProductId);

    app.post(baseUrl+'/:id/delete',productController.deleteProduct);

    app.put(baseUrl+'/:id/edit',productController.editProduct);

    app.post(baseUrl+'/create',productController.createProduct);

}// end setRouter function 

module.exports = {
    setRouter: setRouter
}
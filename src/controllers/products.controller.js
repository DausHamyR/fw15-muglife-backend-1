const errorHandler = require("../helpers/errorHandler.helper")
// const fileRemover = require("../helpers/fileRemover.helper")
const productsModel = require("../models/products.model")
// const userModel = require("../models/user.model")

exports.getAllProducts = async(req, res) => {
    try {
        const allProducts = await productsModel.findAll(
            req.query.page, 
            req.query.limit, 
            req.query.search, 
            req.query.sort, 
            req.query.sortBy
        )
        console.log(allProducts)

        return res.json({
            success: true,
            message: "Products",
            results: allProducts
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.getOneProducts = async (req, res) => {
    try {
        const {id} = req.user
        const products = await productsModel.findOneByUserId(id)
        if(!products){
            throw Error("products_not_found")
        }
        return res.json({
            success: true,
            message: "Products",
            results: products
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}
exports.getOneProductsNonUser = async (req, res) => {
    try {
        const id = req.params.id
        const products = await productsModel.findOne(id)
        if(!products){
            throw Error("products_not_found")
        }
        return res.json({
            success: true,
            message: "Products",
            results: products
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.createProducts = async (req,res) => {
    try {
        // const {role} = request.user
        // if(role === "standard"){
        //     throw Error("only_admin_have_access")
        // }

        const data = {
            ...req.body
        }
        const products = await productsModel.insert(data)
        return res.json({
            success: true,
            message: "New Product Created !",
            results: products
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
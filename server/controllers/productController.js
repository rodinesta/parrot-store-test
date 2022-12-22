const {Product, Genus} = require('../models/models')
const ApiError = require('../error/ApiError')
const {where} = require("sequelize");

class ProductController {
    async create(req, res, next) {
        try{
            let {title, price, information, genuId, genus} = req.body
            const product = await Product.create({title, price, information,genuId})

            if (genus) {
                genus = JSON.parse(genus)
                genus.forEach(i => Genus.create({
                    title: i.title,
                    genuId: product.genuId
                }))
            }

            return res.json(product)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try{
            let {genuId} = req.query
            let products = await Product.findAndCountAll({where: {genuId}});

            return res.json(products)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: Genus}]
            },
        )

        return res.json(product)
    }

}

module.exports = new ProductController()
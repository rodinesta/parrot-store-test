const {Product, Genus} = require('../models/models')
const ApiError = require('../error/ApiError')
const {where} = require("sequelize");
const uuid = require('uuid')
const path = require('path')

class ProductController {
    async create(req, res, next) {
        try{
            let {title, price, information, genuId, genus, userId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const product = await Product.create({title, price, information, genuId, userId, img: fileName})

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
            let {genuId, userId} = req.query
            let products;
            if (genuId) {
                products = await Product.findAndCountAll({where: {genuId}});
            }
            if (userId) {
                products = await Product.findAndCountAll({where: {userId}});
            }
            if (!genuId && !userId) {
                products = await Product.findAndCountAll();
            }

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
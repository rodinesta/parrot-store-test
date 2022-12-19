const {Genus} = require('../models/models')
const ApiError = require('../error/ApiError')

class GenusController {
    async create(req, res) {
        const {title} = req.body
        const genus = await Genus.create({title})
        return res.json(genus)
    }

    async getAll(req, res) {
        const genus = await Genus.findAll()
        return res.json(genus)
    }

}

module.exports = new GenusController()
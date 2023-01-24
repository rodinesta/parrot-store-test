const {Role} = require('../models/models')
const ApiError = require('../error/ApiError')

class RoleController {
    async create(req, res) {
        const {title} = req.body
        const role = await Role.create({title})
        return res.json(role)
    }

    async getAll(req, res) {
        const role = await Role.findAll()
        return res.json(role)
    }
}

module.exports = new RoleController()
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User, Product, Genus} = require('../models/models')
const jwt = require('jsonwebtoken')
const {decode} = require("jsonwebtoken");

const generateJwt = (id, login, roleId) => {
    return jwt.sign(
        {id, login, roleId},
        process.env.SECRET_KEY,
        {expiresIn: '48h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {login, password, roleId} = req.body
        if(!login || !password) {
            return next(ApiError.badRequest('Некорректный логин или пароль'))
        }
        const candidate = await User.findOne({where: {login}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, roleId, password: hashPassword})
        const token = generateJwt(user.id, user.login, user.roleId)
        return res.json({token})
    }

    async login(req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.badRequest('Пользователь с таким логином не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Неверный пароль'))
        }
        const token = generateJwt(user.id, user.login, user.roleId)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.roleId)
        return res.json({token})
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.query
            const user = await User.findOne(
                {
                    where: {id}
                },
            )
            return res.json(user)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async putInfromation(req, res, next) {
        try {
            const {id, firstName, secondName, lastName, phoneNumber} = req.body
            const user = User.update({firstName, secondName, lastName, phoneNumber}, {where: {id}})

            return res.json(user);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()
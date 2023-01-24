const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
})

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    phoneNumber: {type: DataTypes.STRING, unique: true},
    firstName: {type: DataTypes.STRING},
    secondName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING}
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    information: {type: DataTypes.TEXT},
    price: {type: DataTypes.INTEGER},
    img: {type: DataTypes.TEXT}
})

const Genus = sequelize.define('genu', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
})

// ONE-to-MANY

Genus.hasMany(Product)
Product.belongsTo(Genus)

User.hasMany(Product)
Product.belongsTo(User)

Role.hasMany(User)
User.belongsTo(Role)

module.exports = {
    Genus,
    Product,
    Role,
    User
}
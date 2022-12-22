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

const Article = sequelize.define('article', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING},
    publishDate: {type: DataTypes.DATE}
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    content: {type: DataTypes.STRING},
    publishDate: {type: DataTypes.DATE}
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    information: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER}
})

const Genus = sequelize.define('genu', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
})

//MANY-to-MANY TABLES



const ArticleComment = sequelize.define('article_comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

// ONE-to-MANY

Genus.hasMany(Product)
Product.belongsTo(Genus)

User.hasMany(Product)
Product.belongsTo(User)

Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Article)
Article.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

// MANY-to-MANY

Article.belongsToMany(Comment, {through: ArticleComment})
Comment.belongsToMany(Article, {through: ArticleComment})


module.exports = {
    Genus,
    Product,
    Role,
    User,
    Article,
    Comment,
    ArticleComment
}
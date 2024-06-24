'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class PriceRange extends Model {

        static associate(models) {

        }
    }

    PriceRange.init({
        title: DataTypes.STRING,
        priceMin: DataTypes.INTEGER,
        priceMax: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'PriceRange'
    })
    return PriceRange
}
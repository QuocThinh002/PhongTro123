'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class PriceRange extends Model {

        static associate(models) {

        }
    }

    PriceRange.init({
        title: DataTypes.STRING,
        min: DataTypes.INTEGER,
        max: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'PriceRange'
    })
    return PriceRange
}
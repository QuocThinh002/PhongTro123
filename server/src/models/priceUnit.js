'use strict'

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PriceUnit extends Model {
        static associate(models) {

        }
    }

    PriceUnit.init({
        title: DataTypes.STRING,
        value: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'PriceUnit'
    })
    return PriceUnit
}
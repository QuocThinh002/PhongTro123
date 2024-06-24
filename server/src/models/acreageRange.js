'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class AcreageRange extends Model {

        static associate(models) {
        
        }
    }

    AcreageRange.init({
        title: DataTypes.STRING,
        acreageMin: DataTypes.INTEGER,
        acreageMax: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'AcreageRange'
    })
    return AcreageRange
}
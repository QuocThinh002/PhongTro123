'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ArceageRanges', {
            id: {
                allowNull: false,
                primary: true,
                type: Sequelize.STRING
            },
            acreageMin: {
                type: Sequelize.INTEGER
            },
            acreageMax: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }) 
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('AcreageRanges')
    }
}
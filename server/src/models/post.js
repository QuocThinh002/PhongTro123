'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Post.belongsTo(models.Image, { foreignKey: 'imagesId', as: 'images' })
            Post.belongsTo(models.Attribute, { foreignKey: 'attributesId', as: 'attributes' })
            Post.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
        }
    }
    Post.init({
        title: DataTypes.STRING,
        star: DataTypes.STRING,
        labelCode: DataTypes.STRING,
        address: DataTypes.STRING,
        attributesId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Attributes',
                key: 'id'
            }
        },
        categoryCode: DataTypes.STRING,
        description: DataTypes.TEXT,
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        overviewId:{
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Overviews',
                key: 'id'
            }
        },
        imagesId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Images',
                key: 'id'
            }
        },
    }, {
        sequelize,  
        modelName: 'Post',
    });
    return Post;
};
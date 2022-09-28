'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Articles extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Articles.init({
        author_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        slug: DataTypes.STRING,
        view: DataTypes.INTEGER,
        image_post: DataTypes.STRING,
        body: DataTypes.TEXT,
        category: DataTypes.STRING,
        published: DataTypes.BOOLEAN,
        images: DataTypes.ARRAY(DataTypes.STRING),
        isShowImage: DataTypes.BOOLEAN,
        transliterated: DataTypes.STRING,
        summanyContent: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Articles',
    });
    return Articles;
};
'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Articles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            author_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false
            },
            view: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            image_post: {
                type: Sequelize.STRING
            },
            body: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            category: {
                type: Sequelize.STRING,
                allowNull: false
            },
            published: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            images: {
                type: Sequelize.ARRAY(Sequelize.STRING)
            },
            isShowImage: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            transliterated: {
                type: Sequelize.STRING,
                allowNull: false
            },
            summanyContent: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Articles');
    }
};
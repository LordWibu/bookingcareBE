'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Contact extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    Contact.init({
        fullName: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        content: DataTypes.TEXT,
        status: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Contact',
    });
    return Contact;
};
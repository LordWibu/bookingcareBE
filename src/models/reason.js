'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Reason extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Reason.init({
        name: DataTypes.STRING,
        specialtyId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Reason',
    });
    return Reason;
};
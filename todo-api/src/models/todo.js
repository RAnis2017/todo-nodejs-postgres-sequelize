'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Todos,{
        onDelete: 'CASCADE',
        foreignKey: {
            name: 'parentId',
            allowNull: true
        },
        as: 'subTasks'
      })
    }
  };
  Todos.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Todos',
        key: 'parentId'
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Todos',
  });
  return Todos;
};
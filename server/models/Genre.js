// models/Genre.js
module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      tableName: 'genres',
      timestamps: true
    });
    
    return Genre;
  };
  
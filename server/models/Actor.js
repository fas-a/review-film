// models/Actor.js
module.exports = (sequelize, DataTypes) => {
    const Actor = sequelize.define('Actor', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      birth_date: {
        type: DataTypes.DATE
      },
      photo: {
        type: DataTypes.BLOB('long')
      },
      country_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'countries',
          key: 'id'
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      tableName: 'actors',
      timestamps: true
    });
    
    return Actor;
  };
  
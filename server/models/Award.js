// models/Award.js
module.exports = (sequelize, DataTypes) => {
    const Award = sequelize.define('Award', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      year: {
        type: DataTypes.INTEGER(4),
        allowNull: false
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
      tableName: 'awards',
      timestamps: true
    });
    
    return Award;
  };
  
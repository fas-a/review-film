// models/Drama.js
module.exports = (sequelize, DataTypes) => {
    const Drama = sequelize.define('Drama', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      poster: {
        type: DataTypes.TEXT
      },
      alt_title: {
        type: DataTypes.STRING(255)
      },
      year: {
        type: DataTypes.INTEGER(4)
      },
      country_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'countries',
          key: 'id'
        }
      },
      synopsis: {
        type: DataTypes.TEXT
      },
      availability: {
        type: DataTypes.STRING(255)
      },
      link_trailer: {
        type: DataTypes.TEXT
      },
      status: {
        type: DataTypes.ENUM('Unapproved', 'Approved', 'Pending'),
        defaultValue: 'Pending'
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      tableName: 'dramas',
      timestamps: true
    });
    
    return Drama;
  };
  
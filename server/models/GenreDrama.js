// models/GenreDrama.js
module.exports = (sequelize, DataTypes) => {
    const GenreDrama = sequelize.define('GenreDrama', {
      drama_id: {
        type: DataTypes.BIGINT,
        references: {
          model: 'dramas',
          key: 'id'
        }
      },
      genre_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'genres',
          key: 'id'
        }
      }
    }, {
      tableName: 'genre_drama',
      timestamps: false,
      primaryKey: false,
      defaultScope: {
        attributes: { exclude: ['id'] }
      }
    });
    
    return GenreDrama;
  };
  
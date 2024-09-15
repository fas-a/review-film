// models/ActorDrama.js
module.exports = (sequelize, DataTypes) => {
  const ActorDrama = sequelize.define('ActorDrama', {
    actor_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'actors',
        key: 'id'
      }
    },
    drama_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'dramas',
        key: 'id'
      }
    }
  }, {
    tableName: 'actor_drama',
    timestamps: false,
    primaryKey: false
  });

  return ActorDrama;
};

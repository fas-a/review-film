// models/Comment.js
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      drama_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'dramas',
          key: 'id'
        }
      },
      rate: {
        type: DataTypes.INTEGER(1)
      },
      content: {
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
      tableName: 'comments',
      timestamps: true
    });
    
    return Comment;
  };
  
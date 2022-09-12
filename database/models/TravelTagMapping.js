const baseMigration = require( "../config/baseMigration" );

module.exports = (sequelize, Sequelize) => {
  const TravelTagMapping = sequelize.define(
    "TravelTagMapping",
    {
      ...baseMigration,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tagId: {
        field: "tag_id",
        type: Sequelize.INTEGER,
        references: {
          model: "tags",
          key: "id",
        },
      },
      travelId: {
        field: "travel_id",
        type: Sequelize.INTEGER,
        references: {
          model: "travels",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "travel_tag_mapping",
      underscored: true,
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  TravelTagMapping.associate = function (models) {
    // User.hasMany(models.Contract, {
    //   as: 'contracts',
    //   foreignKey: {
    //     name: 'user_id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
  };

  return TravelTagMapping;
};

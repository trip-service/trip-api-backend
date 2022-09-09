module.exports = (sequelize, Sequelize) => {
  const TravelNodeTagMapping = sequelize.define(
    "TravelNodeTagMapping",
    {
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
      traveNodelId: {
        field: "travel_node_id",
        type: Sequelize.INTEGER,
        references: {
          model: "travel_nodes",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "travel_node_tag_mapping",
      underscored: true,
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  TravelNodeTagMapping.associate = function (models) {
    TravelNodeTagMapping.hasMany(models.Tag, {
      as: 'tags',
      foreignKey: {
        name: 'tag_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    TravelNodeTagMapping.hasMany(models.Tag, {
      as: 'travelNodes',
      foreignKey: {
        name: 'tag_node_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return TravelNodeTagMapping;
};

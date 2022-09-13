const baseMigration = require( "../config/baseMigration" );

module.exports = (sequelize, Sequelize) => {
  const TravelNodeLocation = sequelize.define(
    "TravelNodeLocation",
    {
      ...baseMigration,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      travelNodeId: {
        field: "travel_node_id",
        type: Sequelize.INTEGER,
        references: {
          model: "travel_nodes",
          key: "id",
        },
      },
      name: {
        field: "name",
        type: Sequelize.STRING,
      },
      getJson: {
        field: "get_json",
        type: Sequelize.JSON,
      },
    }, {
    sequelize,
    tableName: "travel_node_locations",
    underscored: true,
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  TravelNodeLocation.associate = function (models) {
    // User.hasMany(models.Contract, {
    //   as: 'contracts',
    //   foreignKey: {
    //     name: 'user_id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
  };

  return TravelNodeLocation;
};
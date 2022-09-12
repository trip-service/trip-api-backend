const baseMigration = require( "../config/baseMigration" );

module.exports = (sequelize, Sequelize) => {
  const TravelNodeLink = sequelize.define(
    "TravelNodeLink",
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
      url: {
        field: "url",
        type: Sequelize.TEXT,
      },
      image: {
        field: "image",
        type: Sequelize.TEXT,
      },
      keyWords: {
        field: "key_words",
        type: Sequelize.TEXT,
      },
      title: {
        field: "title",
        type: Sequelize.STRING,
      },
      description: {
        field: "description",
        type: Sequelize.STRING,
      },
      getJson: {
        field: "get_json",
        type: Sequelize.JSON,
      },
    }, {
    sequelize,
    tableName: "travel_node_links",
    underscored: true,
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  TravelNodeLink.associate = function (models) {
    // User.hasMany(models.Contract, {
    //   as: 'contracts',
    //   foreignKey: {
    //     name: 'user_id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
  };

  return TravelNodeLink;
};
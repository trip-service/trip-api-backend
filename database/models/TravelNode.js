const baseMigration = require( "../config/baseMigration" );

module.exports = (sequelize, Sequelize) => {
  const TravelNode = sequelize.define(
    "TravelNode",
    {
      ...baseMigration,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      travelId: {
        field: "travel_id",
        type: Sequelize.INTEGER,
        references: {
          model: "travels",
          key: "id",
        },
      },
      title: {
        field: "title",
        type: Sequelize.STRING,
      },
      description: {
        field: "description",
        type: Sequelize.STRING,
      },
      location: {
        field: "location",
        type: Sequelize.JSON,
      },
      startAtTime: {
        field: "start_at_time",
        type: Sequelize.DATE,
      },
      duration: {
        field: "duration",
        type: Sequelize.INTEGER,
        length: 4,
      },
      date: {
        field: "date",
        allowNull: false,
        type: Sequelize.DATE,
      },
    }, {
    sequelize,
    tableName: "travel_nodes",
    underscored: true,
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  TravelNode.associate = function (models) {
    // User.hasMany(models.Contract, {
    //   as: 'contracts',
    //   foreignKey: {
    //     name: 'user_id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
  };

  return TravelNode;
};
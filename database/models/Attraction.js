module.exports = (sequelize, Sequelize) => {
  const Attraction = sequelize.define(
    "Attraction",
    {
      ...baseMigration,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        field: "name",
        type: Sequelize.STRING,
        length: 20,
      },
      geoJson: {
        field: "geo_json",
        type: Sequelize.JSON,
      },
    },
    {
      sequelize,
      tableName: "attractions",
      underscored: true,
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Attraction.associate = function (models) {
    // User.hasMany(models.Contract, {
    //   as: 'contracts',
    //   foreignKey: {
    //     name: 'user_id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
  };

  return Attraction;
};

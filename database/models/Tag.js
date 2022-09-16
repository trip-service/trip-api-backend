const baseMigration = require( "../config/baseMigration" );

module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define(
    "Tag",
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
      },
    }, {
    sequelize,
    tableName: "tags",
    underscored: true,
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  Tag.associate = function (models) {

    Tag.belongsToMany(models.Tag, {
      as: "travels",
      through: 'travel_tag_mapping',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // User.hasMany(models.Contract, {
    //   as: 'contracts',
    //   foreignKey: {
    //     name: 'user_id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
  };

  return Tag;
};
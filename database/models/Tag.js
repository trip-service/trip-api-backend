
module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define(
    "Tag",
    {
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

    createdAt: "created_date",
    updatedAt: "updated_at",
  });

  Tag.associate = function (models) {
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
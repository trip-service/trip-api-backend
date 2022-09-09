
module.exports = (sequelize, Sequelize) => {
  const Member = sequelize.define(
    "Member",
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
        length: 20,
      },
      email: {
        field: "email",
        type: Sequelize.STRING,
        length: 50,
        unique: true,
      },
    }, {
    sequelize,
    tableName: "members",
    underscored: true,
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  Member.associate = function (models) {
    // User.hasMany(models.Contract, {
    //   as: 'contracts',
    //   foreignKey: {
    //     name: 'user_id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
  };

  return Member;
};
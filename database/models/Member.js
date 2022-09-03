
module.exports = (sequelize, DataTypes) => {
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
        type: DataTypes.STRING,
        length: 20,
      },
      email: {
        field: "email",
        type: DataTypes.STRING,
        length: 50,
        unique: true,
      },
    }, {
    sequelize,
    tableName: "members",
    underscored: true,
    freezeTableName: true,

    createdAt: "created_date",
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
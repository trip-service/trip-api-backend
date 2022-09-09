module.exports = (sequelize, Sequelize) => {
  const ThirdParty = sequelize.define(
    "ThirdParty",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      memberId: {
        field: "member_id",
        type: Sequelize.INTEGER,
        references: {
          model: "members",
          key: "id",
        },
      },
      type: {
        field: "type",
        type: Sequelize.STRING,
        status: {
          type: Sequelize.ENUM("google"),
        },
      },
      notificationToken: {
        field: "notification_token",
        type: Sequelize.TEXT,
      },
    },
    {
      sequelize,
      tableName: "third_parties",
      underscored: true,
      freezeTableName: true,
      createdAt: "created_date",
      updatedAt: "updated_at",
    }
  );

  ThirdParty.associate = function (models) {
    // User.hasMany(models.Contract, {
    //   as: 'contracts',
    //   foreignKey: {
    //     name: 'user_id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
  };

  return ThirdParty;
};

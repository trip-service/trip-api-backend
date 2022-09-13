const baseMigration = require( "../config/baseMigration" );

module.exports = (sequelize, Sequelize) => {
  const ThirdParty = sequelize.define(
    "ThirdParty",
    {
      ...baseMigration,
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
      referenceId: {
        field: "reference_id",
        type: Sequelize.STRING,
      }
    },
    {
      sequelize,
      tableName: "third_parties",
      underscored: true,
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  ThirdParty.associate = function (models) {
    ThirdParty.hasOne(models.Member, {
      as: 'member',
      foreignKey: {
        name: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return ThirdParty;
};

const baseMigration = require( "../config/baseMigration" );

module.exports = (sequelize, Sequelize) => {
  const Member = sequelize.define(
    "Member",
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
    Member.hasMany(models.Travel, {
      as: 'travels',
      foreignKey: {
        name: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    Member.hasMany(models.Travel, {
      as: 'members',
      foreignKey: {
        name: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    Member.hasOne(models.ThirdParty, {
      as: 'thirdParty',
      foreignKey: {
        name: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return Member;
};
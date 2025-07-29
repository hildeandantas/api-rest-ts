"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Users",
      {
        id: {
          type: DataTypes.STRING,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        firstName: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        lastName: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        email: {
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
          set(value) {
            this.setDataValue("email", value.toLowerCase());
          },
          type: DataTypes.STRING,
        },
        password: {
          allowNull: false,
          validate: {
            len: [6, 100],
          },
          set(value) {
            this.setDataValue("password", value);
          },
          type: DataTypes.STRING,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },
      {
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: true,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};

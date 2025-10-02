import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Book = sequelize.define(
    "books",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isbn: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("available", "borrowed"),
            defaultValue: "available",
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        underscored: true,
    }
);


export default Book;      
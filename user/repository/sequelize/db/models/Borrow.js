import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';
import Book from "./Book.js";
import User from "./User.js";

const Borrow = sequelize.define('borrows', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.ENUM('BORROWED', 'RETURNED', 'OVERDUE'),
        allowNull: false,
        defaultValue: 'BORROWED',
    },
    borrowDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    returnDate: {
        type: DataTypes.DATE,
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
}, {
    underscored: true,
});



/// Relations
User.hasMany(Borrow, { foreignKey: 'user_id' });
Borrow.belongsTo(User, { foreignKey: 'user_id' });

Book.hasMany(Borrow, { foreignKey: 'book_id' });
Borrow.belongsTo(Book, { foreignKey: 'book_id' });

export { User, Book, Borrow };


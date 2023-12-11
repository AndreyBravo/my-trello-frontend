import Sequelize from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  passwordHash: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  rang: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,

  },
  // Другие поля...
});

// Создание таблицы в базе данных (если ее нет)
User.sync({ force: false }).then(() => {
  console.log('User table created (or already exists)');
});

export default User;

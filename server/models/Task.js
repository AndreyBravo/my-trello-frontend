import Sequelize from 'sequelize';
import sequelize from '../db.js';

const Task = sequelize.define('Task', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: Sequelize.STRING(48),
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  employer: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  employee: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  grade: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  deadLine: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
});

// Создание таблицы в базе данных (если ее нет)
Task.sync({ force: false }).then(() => {
  console.log('Task table created (or already exists)');
});

export default Task;

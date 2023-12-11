import Sequelize from 'sequelize';
import sequelize from '../db.js';

const Kpi = sequelize.define('Kpi', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  value: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  // Другие поля...
});

// Создание таблицы в базе данных (если ее нет)
Kpi.sync({ force: false }).then(() => {
  console.log('Kpi table created (or already exists)');
});

export default Kpi;

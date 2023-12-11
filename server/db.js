// import pkg from 'pg';

// const { Pool } = pkg;

// export const pool = new Pool({
//     host: 'localhost',
//     port: 5432,
//     database: 'my-trello',
//     user: 'postgres',
//     password: 'admin'
// })

import Sequelize from 'sequelize';

// Настройка подключения к базе данных
const sequelize = new Sequelize('my-trello', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

// Проверка подключения
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;


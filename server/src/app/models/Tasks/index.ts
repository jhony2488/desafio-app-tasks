import {DataTypes}  from 'sequelize';
import db from '../../../config/database.cjs';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const Tasks= db.define('Tasks', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: DataTypes.STRING,
  completed: DataTypes.BOOLEAN,
})

export default Tasks ;

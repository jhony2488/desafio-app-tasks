import sequelize,{DataType  } from 'sequelize';

require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

export default (sequelize, DataTypes) => {
    const Tasks  = sequelize.define(
        'Tasks',
        {
            title: DataTypes.STRING,
            completed: DataTypes.BOOLEAN,
        },
    )
    return Tasks;
}

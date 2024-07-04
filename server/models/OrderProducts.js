import { DataTypes } from 'sequelize';
import { sequelizeConfig } from '../config/database.js';
import Orders from './Orders.js';
import Products from './Products.js';

const OrderProducts = sequelizeConfig.define(
    'OrderProducts',
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }
);

Orders.belongsToMany(Products, { through: OrderProducts });
Products.belongsToMany(Orders, { through: OrderProducts });

export default OrderProducts;

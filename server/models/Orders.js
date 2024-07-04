import { DataTypes } from "sequelize";
import { sequelizeConfig } from "../config/database.js";
import Users from "./Users.js";
import DeliveryBoys from "./DeliveryBoys.js";

const Orders = sequelizeConfig.define(
    'Orders', 
    {
        orderDetails: {
            type: DataTypes.STRING,
            allowNull: false
        },
        orderStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }
);

DeliveryBoys.hasMany(Orders, { foreignKey: 'deliveryBoyId' });
Orders.belongsTo(DeliveryBoys, { foreignKey: 'deliveryBoyId' });

Users.hasMany(Orders, { foreignKey: 'userId' });
Orders.belongsTo(Users, { foreignKey: 'userId' });

export default Orders;

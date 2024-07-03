import { DataTypes } from "sequelize";
import { sequelizeConfig } from "../config/database.js";

const DeliveryBoys = sequelizeConfig.define(
    'DeliveryBoys',
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Ratings: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 5,
                isInt: true
            }
        },
        OrdersDeliveredTillDate: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                isInt: true
            }
        }
    }
)

export default DeliveryBoys;
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
            unique: true,
            isEmail: {
                args: true,
                msg: "Invalid email format. Must be a valid email address."
            },
            isGmail(value) {
                if (!value.endsWith('@gmail.com')) {
                    throw new Error('Email must be a Gmail address');
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10, 10] 
            }
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
        },
        isAvilable: {
            type: DataTypes.BOOLEAN,
            allownull : false,
            defaultValue: false
        }
    }
)

export default DeliveryBoys;
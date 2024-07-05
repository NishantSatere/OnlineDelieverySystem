import { DataTypes } from "sequelize";
import { sequelizeConfig } from "../config/database.js";

const Users = sequelizeConfig.define(
    'Users',
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
        phoneNo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10, 10] 
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

export default Users;
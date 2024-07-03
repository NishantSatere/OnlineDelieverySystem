
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
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

export default Users;
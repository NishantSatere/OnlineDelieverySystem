import { DataTypes } from "sequelize";
import { sequelizeConfig } from "../config/database.js";

const Hotels = sequelizeConfig.define(
    'Hotels', 
    {
        HotelName: {
            type : DataTypes.STRING,
            allownull: false
        },
        Location: {
            type: DataTypes.STRING,
            allownull: false
        }
    }
)

export default Hotels
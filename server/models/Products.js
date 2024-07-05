import { DataTypes } from "sequelize";
import { sequelizeConfig } from "../config/database.js";
import Hotels from "./Hotels.js";

const Products = sequelizeConfig.define(
    'Products',
    {
        nameOfProduct: {
            type: DataTypes.STRING,
            allownull: false,
        },
        priceOfProduct : {
            type: DataTypes.INTEGER,
            allownull: false,
            defaultvalue : 0
        },
        HotelId: {
            type: DataTypes.INTEGER,
            allownull: false,
            refrences: {
                model: Hotels,
                key: 'id'
            }
        }
    }
)

Hotels.hasMany(Products, { foreginkey: 'HotelId' })
Products.belongsTo(Hotels, { foreginkey: 'HotelId' })

export default Products
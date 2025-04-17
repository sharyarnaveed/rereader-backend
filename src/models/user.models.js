const {DataTypes} = require('sequelize');

const {sequelize} = require('../database/conn.js')

const User =sequelize.define('user',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        firstname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
            
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phonenumber:{

            type:DataTypes.STRING,
            allowNull:false
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        city:{
            type:DataTypes.STRING,
            allowNull:false
        },
        state:{
            type:DataTypes.STRING,
            allowNull:false
        },
        zipcode:{
            type:DataTypes.STRING,
            allowNull:false
        },
status:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:'notverified'
}
     
    },
    {
        timestamps:true
    }
)

module.exports=User
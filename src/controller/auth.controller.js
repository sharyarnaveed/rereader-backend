const User = require("../models/user.models.js")


const test=async(req,res)=>
{
    const save=await User.create({
        name:"test",
        email:"test@gmail.com",
        password:"test"

    })
    console.log(save);
    
}

module.exports={test}
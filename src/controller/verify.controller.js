const { where } = require("sequelize");
const User = require("../models/user.models.js");
const { decrypt } = require("../utility/urlhashing.js");


const verificationOtp=async(req,res)=>
{
    try {
        const {userid,otp}=req.body
const decipher=await decrypt(userid)


console.log(userid,otp)


const Verify=await User.findOne({
    where:{
        id:decipher
    },
    attributes:["otp"]
})

console.log(Verify.dataValues.otp ,"the otp");

if(Verify.dataValues.otp!==otp)
{
return res.json(
    {
        success:false,
        message:"Enter Correct Otp"
    }
)
}


const updateotp=await User.update(
{otp:"undefi",status:"verified"},

{where:{
    id:decipher
}}
)

if(updateotp)
{
    return res.json({
        success:true,
        message:"Otp verified successfully"
    })
}
else{
    return res.json({
        success:false,
        message:"Otp not verified"
    })
}



    } catch (error) {
        console.log("error in verification",error);
        return res.json({
            success:false,
            message:error
        })

        
    }
}


module.exports={verificationOtp}
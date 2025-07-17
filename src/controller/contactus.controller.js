const Contactus = require("../models/contactus.model");

const contactus=async(req,res)=>
{
try {
  const  {name,email,subject,message}=req.body

if(!name||!email||!subject||!message)
{
    return res.json({
        message:"Message NOt saved",
        success:false
    })
}

const savecontact=await Contactus.create({
    name,email,subject,message
})



if (savecontact) {
    return res.json({
        message:"Message Sent",
        success:true
    })
}    


} catch (error) {
    console.log("error in contact us",error);
      return res.json({
        message:" Error Message NOt saved",
        success:false
    })
}
}

module.exports={contactus}
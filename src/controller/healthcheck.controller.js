

const health=async(req,res)=>
{
    try {
        
        res.json("in good health")
    } catch (error) {
        console.log("not good health",error);
        
    }
}


const checkacc=async(req,res)=>
{
    try {

        return res.json({
            success:true
        })

        
    } catch (error) {
        console.log(error,"error in checking login");
        
    }
}

module.exports={health,checkacc}
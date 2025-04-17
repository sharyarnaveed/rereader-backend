

const health=async(req,res)=>
{
    try {
        
        res.json("in good health")
    } catch (error) {
        console.log("not good health",error);
        
    }
}

module.exports={health}
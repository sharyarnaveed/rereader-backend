const { app } = require("./src/app.js");
const dotenv = require("dotenv");
const { sequelize } = require("./src/database/conn.js");
const port=3000||5000


dotenv.config({
    path: './.env'
  })

async function testConnection()
{
    try {
         sequelize.authenticate()
         .then(async()=>
        {
            console.log("Database connected successfully");
       await sequelize.sync()

            .then(()=>console.log("Database synced")
        )
        .catch(()=>console.log("Database Not synced")
        )
        })
        .catch((err)=>console.log(err,"error in db"))
     


    } catch (error) {
        console.log("error connecting database",error);
        
    }
}


testConnection()
.then(()=>
{
    app.listen(port,()=>
    {
        console.log('Server is running on port',port);

    })
})
.catch((error)=>
    {
        console.log("error in db",error);
    })
const { app } = require("./src/app.js");
const dotenv = require("dotenv");
const { sequelize } = require("./src/database/conn.js");

dotenv.config({
    path: './.env'
  })

async function testConnection()
{
    try {
        await sequelize.authenticate();
        console.log("database connected");
        sequelize.sync()
.then(()=>console.log("Database synced")
)
.catch(()=>console.log("Database Not synced")
)

    } catch (error) {
        console.log("error connecting database",error);
        
    }
}


testConnection()
.then(()=>
{
    app.listen(3000,()=>
    {
        console.log('Server is running on port 3000');

    })
})
.catch((error)=>
    {
        console.log("error in db",error);
    })
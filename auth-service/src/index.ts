import server from './presentation/server'
import dbConnection from './infrastructure/database/dbConnection'

(async()=>{
    try {
        await dbConnection();
        server;
    } catch (error:any) {
        console.log(error?.message)
        process.exit(1)
    }
})()

const { MongoClient } = require("mongodb");

const uri =
"mongodb+srv://jhashashwat422_db_user:vLaMNzjLzpTSve35@cluster0.ylevnon.mongodb.net/nexusbank?appName=Cluster0";


const client = new MongoClient(uri);


async function test(){

    try{

        await client.connect();

        console.log("MongoDB Driver Connection Successful");

        await client.close();

    }
    catch(error){

        console.log("MongoDB Driver Error:");
        console.log(error.message);

    }

}


test();
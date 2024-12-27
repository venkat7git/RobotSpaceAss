const client = require("../connection/db")

let dbTask = null;
async function run() {
    try{
        const database = client.db('task_management_app')
        dbTask = database.collection('tasks')
        await dbTask.createIndex({TaskName:"text"})
        console.log("tasks connected")
    }catch(e){
        console.log(e)
    }
}

run()

module.exports = dbTask
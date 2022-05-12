const { getDB } = require("./db-connector")

async function find() {
    const db = await getDB();
    const users = await db.collection("test").find().toArray();
    return users;
}

module.exports = {
    find
}
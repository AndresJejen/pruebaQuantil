require('dotenv').config()

module.exports = {
    "CONNMONGO": process.env.MONGODB_CONNSTR
    "USERMONGO": process.env.MONGODB_USER || "User",
    "PSSWMONGO": process.env.MONGODB_PASSWORD || "Pass"
 }
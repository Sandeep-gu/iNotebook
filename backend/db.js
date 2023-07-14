const mongoose = require('mongoose')
const MONG_URI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMong = async ()=>{
    mongoose.connect(MONG_URI,async ()=>{
        console.log("successfully completed")
    })
}
module.exports = connectToMong;
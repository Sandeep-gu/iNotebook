const connectToMong = require('./db');
const express = require('express')
const cors = require('cors')
connectToMong();
const app=express()
const port = 5000

app.use(cors())
app.use(express.json())
//Available Routes
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
//app.get('/',(req,res)=>{
//    res.send('hello world');
//})
app.listen(port,()=>{
    console.log(`iNotebook app listening at http://localhost:${port}`)
})
var admin = require("firebase-admin");
var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var app = express()
require('dotenv').config()

const port = process.env.PORT || 5000
const serviceAccount = require("./serviceAccountKey.json");
const mongoConfig = {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    ssl:true,
    replicaSet:"Tripnic-shard-0",
    authSource:"admin",
    retryWrites:true,
    w:"majority",
}
const corsOptions = {
    origin: process.env.WHITE_LISTED_ORIGIN
}
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://donate-plasma.firebaseio.com"
});

mongoose.connect(process.env.MONGO_URI,mongoConfig)

app.use(bodyParser.json())
app.use(cors(corsOptions))

app.get('/',(req,res)=>{
    res.send(req.query)
})

app.post('/',(req,res)=>{
    res.send(req.body.name)
})

mongoose.connection.once('open',()=>{
    console.log("Database Connected")
    app.listen(port,()=>{
        console.log("server listening at port "+port)
    })
})

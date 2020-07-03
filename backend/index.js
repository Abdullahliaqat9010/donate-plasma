var admin = require("firebase-admin");
var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var app = express()
require('dotenv').config()
var Donor = require('./models/donor')
var authentication = require('./utils/authentication')

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

app.get('/donors', async(req,res)=>{
    const {city,bloodGroup} = req.query
    var queryObj = {}
    if(city){
        queryObj = {...queryObj,city}
    }
    if(bloodGroup){
        queryObj = {...queryObj,bloodGroup}
    }
    const donors = await Donor.find(queryObj,{phone:0,_id:0}).limit(50).exec()
    res.send(donors)
})

app.get('/donor',authentication, async(req,res)=>{
    const {uid} = req.query
    const donor = await Donor.findOne({uid},{_id:0}).exec()
    res.send(donor)
})

app.post('/donor',authentication,async(req,res)=>{
    const {
        name,
        age,
        city,
        bloodGroup,
        phone
    } = req.body
    const {uid} = res.locals
    const donor = await Donor.create({
        uid,
        name,
        age,
        city,
        bloodGroup,
        phone
    })
    console.log(donor)
    res.send(donor)
})

app.get('/profile',authentication, async (req,res)=>{
    const {uid} = res.locals 
    const donor = await Donor.find({uid},{_id:0}).exec()
    res.send(donor)
})

app.put('/donor',authentication,async(req,res)=>{
    const {name,age,city,bloodGroup} = req.body
    const {uid} = res.locals
    const updatedDonor = await Donor.updateOne({uid},{
        name,
        age,
        bloodGroup,
        city
    }).exec()
    res.send(updatedDonor)
})

app.delete('/donor',authentication,async(req,res)=>{
    const {uid} = res.locals
    const deleted = await Donor.deleteOne({uid}).exec()
    res.send(deleted)
})

mongoose.connection.once('open',()=>{
    console.log("Database Connected")
    app.listen(port,()=>{
        console.log("server listening at port "+port)
    })
})

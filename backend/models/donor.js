var mongoose = require('mongoose')

const DonorSchema = mongoose.Schema({
    name : String,
    age : Number,
    city : String,
    bloodGroup : String,
    phone : String,
    uid:String,
})

const Donor = mongoose.model("Donor",DonorSchema)
module.exports = Donor
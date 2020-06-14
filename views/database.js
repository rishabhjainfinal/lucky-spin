const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://rishabh:1Rishabh@jain@rishabhdatabase-7ayur.mongodb.net/spin?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const databaseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: Number,
    mobile: Number,
    address: String, //once and other in update
    shared: Number,
    position: Object, //ip and location
    device: Object
})

module.exports = mongoose.model('Spinproject', databaseSchema)
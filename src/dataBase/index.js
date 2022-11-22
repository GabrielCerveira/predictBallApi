/*
import mongoose from "mongoose"

mongoose.connect("mongodb://localhost/predictball",{useMongoClient: true})

mongoose
    .connect("mongodb://localhost/predictball",{useMongoClient: true})
    .then(() => {
        console.log("Conectamos ao MongoDB!")
        mongoose.Promise = global.Promise
    })
    .catch((err) => console.log(err))

export default mongoose
    */
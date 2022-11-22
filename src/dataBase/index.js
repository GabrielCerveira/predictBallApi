import mongoose from "mongoose"

mongoose.connect("mongodb://localhost/predictball",{useMongoClient: true})
mongoose.Promise = global.Promise

export default mongoose
    
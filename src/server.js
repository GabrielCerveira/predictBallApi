const express = require("express")
const routes = require("./routes")
const puppeteer = require("./utils/scraping")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

//Routes of API
app.use(routes)

//Conecta MongoDB
mongoose
    .connect("mongodb://localhost/predictball")
    .then(() => {
        console.log("Conectamos ao MongoDB!")
        app.listen(4000,() => {
            console.log("server is listing")
        })
        mongoose.Promise = global.Promise
        puppeteer.scraping()
    })
    .catch((err) => console.log(err))

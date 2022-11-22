const Router = require("express")
const teamsController = require("./controller/teams/teamsController")


const routes = Router()

//Routes home


//Routes teams create
routes.post("/teams/create", teamsController.create)

module.exports = routes 
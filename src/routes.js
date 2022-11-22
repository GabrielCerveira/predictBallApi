const Router = require("express")
const teamsController = require("./controller/teams/teamsController")
const matchesController = require("./controller/matches/matchesController")


const routes = Router()

//Routes home


//Routes teams create
routes.post("/teams/create", teamsController.create)
routes.post("/matches/create", matchesController.create)

module.exports = routes 
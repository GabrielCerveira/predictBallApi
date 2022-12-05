const Router = require("express")
const teamsController = require("./controller/teams/teamsController")
const matchesController = require("./controller/matches/matchesController")
const championshipsController = require("./controller/championships/championshipsController")


const routes = Router()

//Routes home


//Rota para criar um time
routes.post("/teams/create", teamsController.create)
routes.get("/teams/createAllSelection", teamsController.createAllSelection)

//Rota para criar uma partida
routes.post("/matches/create", matchesController.create)
routes.post("/matches/createArrayMatches", matchesController.createArrayMatches)
routes.put("/matches/addResultMatch", matchesController.addResultMatch)
routes.get("/matches/", matchesController.aggregateMatches)

//Rota para criar um campeonato
routes.post("/championships/create", championshipsController.create)

//Rota para visualizar todos os campeonatos
routes.get("/championships", championshipsController.find)

routes.patch("/championships/update/:id", championshipsController.updateChampionship)
module.exports = routes 
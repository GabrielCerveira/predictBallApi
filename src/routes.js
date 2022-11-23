const Router = require("express")
const teamsController = require("./controller/teams/teamsController")
const matchesController = require("./controller/matches/matchesController")
const championshipsController = require("./controller/championships/championshipsController")


const routes = Router()

//Routes home


//Rota para criar um time
routes.post("/teams/create", teamsController.create)

//Rota para criar uma partida
routes.post("/matches/create", matchesController.create)

//Rota para criar um campeonato
routes.post("/championships/create", championshipsController.create)

//Rota para visualizar todos os campeonatos
routes.get("/championships", championshipsController.find)

routes.patch("/championships/update/:id", championshipsController.updateChampionship)
module.exports = routes 
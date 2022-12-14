const Router = require("express")
const teamsController = require("./controller/teams/teamsController")
const matchesController = require("./controller/matches/matchesController")
const championshipsController = require("./controller/championships/championshipsController")
const betsController = require("./controller/bets/betsController")


const routes = Router()

//Rota para criar um time
routes.post("/teams/create", teamsController.create)

//Rota visualizar todos os times
routes.get("/teams", teamsController.showTeams)

//Rota para criar todas as seleçoes
routes.get("/teams/createAllSelection", teamsController.createAllSelection)

//Rota para criar uma partida
routes.post("/matches/create", matchesController.create)

//Rota para criar partidas a partir de um array
routes.post("/matches/createArrayMatches", matchesController.createArrayMatches)

//Rota para adicionar um resultado a partida
routes.patch("/matches/addResultMatch/:id", matchesController.addResultMatch)

//Rota para visualizar todas as partidas
routes.get("/matches/", matchesController.aggregateMatches)

//Rota para criar um campeonato
routes.post("/championships/create", championshipsController.create)

//Rota para visualizar todos os campeonatos
routes.get("/championships", championshipsController.find)

//Rota para atualizar um campeonato
routes.patch("/championships/update/:id", championshipsController.updateChampionship)

//Rota para criar uma aposta 
routes.post("/bet/create", betsController.create)

//Rota para atualizar uma aposta 
routes.patch("/bet/update/:id", betsController.updateByID)

//Rota para deletar uma aposta 
routes.delete("/bet/delete/:id", betsController.deleteByID)

//Rota para verificar se a partida foi finalizada e definir o status final 
routes.post("/bet/set/winner/:id", betsController.verifyBetByID)

//Rota para exiber todas as apostas 
routes.get("/bets", betsController.find)

//Rota para exiber todas as apostas de um usuário e de um bolão 
//add :idSweepstakes/
routes.get("/bets/:punter", betsController.findByIDUserAndSweepstakes)

module.exports = routes
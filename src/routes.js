const Router = require("express")
const teamsController = require("./controller/teams/teamsController")
const matchesController = require("./controller/matches/matchesController")
const championshipsController = require("./controller/championships/championshipsController")
const betsController = require("./controller/bets/betsController")
const sweepstakesController = require("./controller/sweepstakes/sweepstakesContoller")
const usersController = require("./controller/users/usersController")
const middlewares = require("./middlewares/auth")


const routes = Router()

//Rota para criar um usuário
routes.post("/user/register", usersController.create)

//Rota para gerar um token de autentificação
routes.post("/user/auth", usersController.auth)

//verifica se o token é valido
routes.use(middlewares.auth)

//Rota para adicionar saldo a conta do usuário
routes.patch("/user/addBalance/:id", usersController.addBalanceUser)

//Rota para adicionar saldo a conta do usuário
routes.patch("/user/addSweepstake", usersController.addSweepstake)

//Rota para criar um time
routes.post("/teams/create", teamsController.create)

//Rota para criar todas as seleçoes
routes.get("/teams/createAllSelection", teamsController.createAllSelection)

//Rota visualizar todos os times
routes.get("/teams", teamsController.showTeams)

//Rota para atuaalizar um time
routes.patch("teams/update/:id", teamsController.updateByID)

//Rota para deletar um time
routes.delete("/teams/delete/:id", teamsController.deleteByID)

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

//Rota para criar um bolão
routes.post("/sweepstakes/create", sweepstakesController.create)

//Rota para atualizar o prêmio do bolão de forma automatica
routes.post("/sweepstakes/updateValueToAward/:id", sweepstakesController.updateValueToAward)

//Rota para atualizar uma aposta 
routes.patch("/bet/update/:id", betsController.updateByID)

//Rota para deletar uma aposta 
routes.delete("/bet/delete/:id", betsController.deleteByID)

//Rota para verificar se a partida foi finalizada e definir o status final 
routes.post("/bet/set/winner/:id", betsController.verifyBetByID)

//Rota para exiber todas as apostas 
routes.get("/bets", betsController.find)

//Rota para exiber todas as apostas de um usuário e de um bolão 
routes.get("/bets/:punter/:sweepstakes", betsController.findByIDUserAndSweepstakes)

module.exports = routes
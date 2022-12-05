const Matches = require("../../dataBase/schemas/matches")
const Teams = require("../../dataBase/schemas/teams")
const mongoose = require("mongoose")

class matchesController{
    // Create Team
    async create(request, response) {
        const {idChampionship,round,stage,groupIndentification, groupNumber,idHomeTeam, idAwayTeam, status, matchDate, stadium, winner, homeTeamResult, awayTeamResult } = request.body
        try{    
            
            //provisorio
            const idhome = await Teams.findOne({ surname: idHomeTeam}).exec()
            const idaway = await Teams.findOne({ surname: idAwayTeam}).exec()
            
            
            const user = await Matches.create({
                idChampionship: mongoose.mongo.ObjectId(idChampionship),
                idHomeTeam : mongoose.mongo.ObjectId(idhome._id), 
                idAwayTeam: mongoose.mongo.ObjectId(idaway._id), 
                round,
                stage,
                groupIndentification,
                groupNumber,
                status, 
                matchDate, 
                stadium, 
                winner, 
                homeTeamResult, 
                awayTeamResult
            })

            return response.json({
                message: "A partida foi cadastrada com sucesso!",
                user
            })
        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }

    async createArrayMatches(request, response) {
        console.log(request.body.teste)
        try{
            for (let index = 0; index < request.body.teste.length; index++) {
                    
                const {idChampionship,round,stage,groupIndentification, groupNumber,idHomeTeam, idAwayTeam, status, matchDate, stadium, winner, homeTeamResult, awayTeamResult } = request.body.teste[index]
            
                //provisorio
                const idhome = await Teams.findOne({ surname: idHomeTeam}).exec()
                const idaway = await Teams.findOne({ surname: idAwayTeam}).exec()

                await Matches.create({
                    idChampionship: mongoose.mongo.ObjectId(idChampionship),
                    idHomeTeam : mongoose.mongo.ObjectId(idhome._id), 
                    idAwayTeam: mongoose.mongo.ObjectId(idaway._id), 
                    round,
                    stage,
                    groupIndentification,
                    groupNumber,
                    status, 
                    matchDate, 
                    stadium, 
                    winner, 
                    homeTeamResult, 
                    awayTeamResult
                })
            }
            return response.json({
                message: "A partida foi cadastrada com sucesso!",
                   
            })
        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }  
    

    async aggregateMatches(request, response){
        try {
            const match = await Matches.aggregate(
                [
                    {
                        "$lookup" : {
                            "from" : "teams",
                            "localField" : "idHomeTeam",
                            "foreignField" : "_id",
                            "as" : "homeTeamData"
                        }
                    }, 
                    {
                        "$lookup" : {
                            "from" : "teams",
                            "localField" : "idAwayTeam",
                            "foreignField" : "_id",
                            "as" : "awayTeamData"
                        }
                    }, 
                    {
                        "$lookup" : {
                            "from" : "championships",
                            "localField" : "idChampionship",
                            "foreignField" : "_id",
                            "as" : "championshipData"
                        }
                    },  
                    {
                        $group : {
                            "_id" : {groupNumber:"$groupNumber", round:"$round"},                
                            "round":{
                                "$push" : "$$ROOT"
                            }
                        }
                    },
                    {
                        $sort: { groupNumber: 1 }
                    },
                ],
            )
            const retorno = []
            for (let index = 0; index < match.length; index++) {
                                
                if(retorno.map((e) => e._id.groupNumber).indexOf(match[index]._id.groupNumber) === -1){
                    const pos = retorno.length 
                    const teste = {
                        _id : {},
                        round:[]
                    } 
                    retorno[pos] = teste
                    retorno[pos]._id = match[index]._id
                    retorno[pos].round.push(match[index].round) 
                    
                }else{
                    const pos = retorno.map((e) => e._id.groupNumber).indexOf(match[index]._id.groupNumber)
                    retorno[pos].round.push(match[index].round)
                }
            }  
            
            for (let index = 0; index < retorno.length; index++) {
                
                retorno[index].round.sort(function (a, b) {
                    for (let index = 0; index < a.length; index++) {
                        if(a[index].round>b[index].round){
                            return 1
                        }else{
                            return -1
                        }
                        
                    }
                    if(a[0].round>b[1].round){
                        return 1
                    }else{
                        return -1
                    }

                })
                
            }

            return response.json({
                message: "Todas as partidas cadastradas",
                retorno
            })
        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }
}

module.exports = new matchesController


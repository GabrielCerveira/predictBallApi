const Matches = require("../../dataBase/schemas/matches")
const mongoose = require("mongoose")

class matchesController{
    // Create Team
    async create(request, response) {
        const {idChampionship,round,stage,groupIndentification, idHomeTeam, idAwayTeam, /*homeTeamInitials, awayTeamInitials,*/ status, matchDate, stadium, winner, homeTeamResult, awayTeamResult } = request.body
        try{    
            
            const user = await Matches.create({
                idChampionship: mongoose.mongo.ObjectId(idChampionship),
                idHomeTeam : mongoose.mongo.ObjectId(idHomeTeam), 
                idAwayTeam: mongoose.mongo.ObjectId(idAwayTeam), 
                round,
                stage,
                groupIndentification,
                //homeTeamInitials, 
                //awayTeamInitials, 
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
                        "$sort": { "groupNumber": 1 }
                    },
                ],
            )
            const retorno = []
            for (let index = 0; index < match.length; index++) {
                const element = []
                console.log("match",match[index]._id.groupNumber)
                console.log("teste",
                    retorno.map((e) => e._id.groupNumber).indexOf(match[index]._id.groupNumber)
                )
                if(element.indexOf(match[index]._id.groupNumber === -1)){
                    element.push(match[index]) 
                    console.log("antes")
                    element.push(match.filter(e => e.groupNumber == element.groupNumber))
                    console.log("depois")
                    retorno.push(element) 
                }
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
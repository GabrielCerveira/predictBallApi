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
                            "_id" : {groupIndentification:"$groupIndentification", round:"$round"},                
                            "round":{
                                "$push" : "$$ROOT"
                            }
                        }
                    },
                    {
                        "$sort": { "groupIndentification": 1 }
                    },
                    {
                        "$sort": { "round": 1 }
                    },
                ],
            )

            return response.json({
                message: "Todas as partidas cadastradas",
                match
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
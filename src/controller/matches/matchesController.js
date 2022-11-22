const Matches = require("../../dataBase/schemas/matches")
const mongoose = require("mongoose")

class matchesController{
    // Create Team
    async create(request, response) {
        const { idHomeTeam, idAwayTeam, homeTeamInitials, awayTeamInitials, status, matchDate, stadium, winner, homeTeamResult, awayTeamResult } = request.body
        try{    
            
            const user = await Matches.create({
                idHomeTeam : mongoose.mongo.ObjectId(idHomeTeam), 
                idAwayTeam: mongoose.mongo.ObjectId(idAwayTeam), 
                homeTeamInitials, 
                awayTeamInitials, 
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
}

module.exports = new matchesController
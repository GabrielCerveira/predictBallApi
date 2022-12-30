const Teams = require("../dataBase/schemas/Teams")

module.exports = {
    async teamFind(team){
        return await Teams.findOne({surname: team})
    },
    async createTeam(surname,initialsTeam,type){
        return await Teams.create({
            team: surname,
            surname,
            initialsTeam,
            type
        })
        
    }
}
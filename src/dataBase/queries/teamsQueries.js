const Teams = require("../schemas/Teams")

module.exports = {
    
    async createTeam(surname,initialsTeam,type){
        return await Teams.create({
            team: surname,
            surname,
            initialsTeam,
            type
        })
    },

    async teamFindBySurname(surname){
        return await Teams.findOne({surname})
    },
   
    async teamFindByTeam(team){      
        return await Teams.findOne({ team })
    },
   
    async teamFindByID(_id){      
        return await Teams.findById({_id}) 
    },
    
    async teamFind(){
        return await Teams.find()
    },

    async updateByID(_id, data){
        return await Teams.updateOne({_id},data)
    },
    
    async deleteByID(_id){
        return await Teams.deleteOne({_id})
    }
}
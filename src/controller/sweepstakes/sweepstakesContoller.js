const Sweepstakes = require("../../dataBase/schemas/sweepstakes")

class sweepstakesController{
    
    async create(request, response){
        const {
            name,
            giveScoreForWinner,
            scoreForWinner,
            scoreForResultExact,
            addScore,
            closeBetHours,
            valueToBet,
            setProportionalValue,
            valueToAward,
            enterPoolAfterStarting,
            setDifferentWeightMatch,
            setWeightForMatch
        } = request.body
        try {
            
            const sweepstakes = await Sweepstakes.create({
                name,
                giveScoreForWinner,
                scoreForWinner,
                scoreForResultExact,
                addScore,
                closeBetHours,
                valueToBet,
                setProportionalValue,
                valueToAward,
                enterPoolAfterStarting,
                setDifferentWeightMatch,
                setWeightForMatch
            })

            return response.status(200).json({
                message: "O bolão foi criado com sucesso!",
                sweepstakes
            })
        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }
}

module.exports = new sweepstakesController
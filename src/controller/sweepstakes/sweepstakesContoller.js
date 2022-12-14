const Sweepstakes = require("../../dataBase/schemas/Sweepstakes")

class sweepstakesController{
    
    //Cria o bolão
    async create(request, response){
        let {
            name,
            giveScoreForWinner,
            scoreForWinner,
            scoreForResultExact,
            addScore,
            closeBetHours,
            valueToBet,
            setProportionalAwardValue,
            valueToAward,
            enterPoolAfterStarting,
            setDifferentWeightMatch,
            setWeightForMatch,
            passedOnOwner,
            feePassedOnOwner
        } = request.body 
        try {
            
            if(typeof giveScoreForWinner === "undefined"){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar se será concedido pontos ao usuário que acertar o vencedor!",
                })
            }

            if(giveScoreForWinner === false){
                scoreForWinner = 0
            }

            if(giveScoreForWinner === true){
                if(!scoreForWinner){
                    return response.status(422).json({
                        error: "Erro de validação",
                        message: "É obrigatório informar os pontos que serão concedidos ao usuário que acertar o time vencedor!",
                    })
                }
            }

            if(!scoreForResultExact){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar os pontos que serão concedidos ao usuário que acertar o resultado exato!",
                })
            }

            if(typeof addScore === "undefined"){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar os pontos do acerto do resultado exato serão somados ao de acertar o vencedor!",
                })
            }

            if(!closeBetHours){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar quantas horas antes do incio do evento que o bolão será fechado!",
                })
            }


            if(closeBetHours < 1 || closeBetHours > 72){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar um valor dentro do périodo  de 1-72 horas",
                })
            }

            if(!valueToBet || valueToBet <= 0){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar um valor para entrar na aposta válido!",
                })
            }

            if(typeof setProportionalAwardValue === "undefined"){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar se o prêmio será calculado proporcionalmente ao valor que foi apostado!",
                })
            }
            
            if(setProportionalAwardValue === true){
                valueToAward = 0
            }
            
            if(setProportionalAwardValue === false){
                if(!valueToAward || valueToAward < 0){
                    return response.status(422).json({
                        error: "Erro de validação",
                        message: "É obrigatório informar o valor do prêmio!",
                    })
                }
            }

            if(typeof enterPoolAfterStarting === "undefined"){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar se é permitido entrar no bolão após o inicio!",
                })
            }
            
            if(typeof setDifferentWeightMatch === "undefined"){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar se as partidas terão pesos diferentes para o bolão!",
                })
            }

            if(setDifferentWeightMatch === true){
                if(!setWeightForMatch){
                    return response.status(422).json({
                        error: "Erro de validação",
                        message: "É obrigatório informar a diferença de peso para cada partida!",
                    })
                }
            }

            if(typeof passedOnOwner === "undefined"){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar se o criador do bolão irá receber uma taxa do valor arrecado!",
                })
            }

            if(passedOnOwner === true){
                if(!feePassedOnOwner){
                    return response.status(422).json({
                        error: "Erro de validação",
                        message: "É obrigatório informar a taxa que sera repassada ao dono do bolão!",
                    })
                }
            }
            
            const sweepstakes = await Sweepstakes.create({
                name,
                giveScoreForWinner,
                scoreForWinner,
                scoreForResultExact,
                addScore,
                closeBetHours,
                valueToBet,
                setProportionalAwardValue,
                valueToAward,
                enterPoolAfterStarting,
                setDifferentWeightMatch,
                setWeightForMatch,
                passedOnOwner,
                feePassedOnOwner
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

    //Atualiza o valor total do prêmio caso a opção "setProportionalValue" = true
    async updateValueToAward (request, response){
        const id = request.params.id
        try {
            if(!id){
                return response.status(404).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar o bolão!",
                })
            }
            const checkSweepstakes = await Sweepstakes.findById({_id: id})

            if(!checkSweepstakes){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O bolão não foi encontrado!"
                })
            }
            
            if(checkSweepstakes.setProportionalAwardValue === false){
                return response.status(404).json({
                    error: "Erro de validação",
                    message: "Este bolão não tem o valor do prêmio calculado automaticamente!",
                })
            }

            if(typeof checkSweepstakes.totalAmountBet === "undefined"||checkSweepstakes.totalAmountBet <= 0){
                return response.status(404).json({
                    error: "Erro de validação",
                    message: "Está bolão ainda não arredou nenhum valor!",
                })
            }

            let fee = 0
            console.log(checkSweepstakes)
            if(checkSweepstakes.passedOnOwner === true){
                fee = checkSweepstakes.feePassedOnOwner/100 
            }
            console.log( fee)


            const valueToAward = checkSweepstakes.totalAmountBet - checkSweepstakes.totalAmountBet * fee

            const updateValueToAward = await Sweepstakes.updateOne({
                _id : id
            },{
                valueToAward
            })
            
            return response.status(200).json({
                message: "O valor do bolão foi atualizado com sucesso!",
                updateValueToAward
            })
        } catch (error) {
            return response.status(500).json({
                error: "Update failed",
                message: error
            })
        }
    }
}

module.exports = new sweepstakesController


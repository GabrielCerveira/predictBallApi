const Championship =  require("../dataBase/schemas/Championships")
const team = require("./teamsUtils")
const puppeter = require("puppeteer")
const moment = require("moment")
const teamsUtils = require("./teamsUtils")

module.exports = {
    async scraping(){
        let data = "29-12-2022"
        const url = `https://ge.globo.com/agenda/#/todos/${data}`
        const browser = await puppeter.launch({headless: true})
        const page = await browser.newPage()

        await page.goto(url)
    
        const links = await page.$$eval(".GroupByChampionshipsstyle__ChampionshipName-sc-132ht2b-2", el => el.map(link => link.href))

        for (let index = 0; index < links.length; index++) {
            console.log("Pagina ", index)
            await page.goto(links[index])
            const championshipName = await page.$eval("section article meta[itemprop='name']", element => element.content)
            const checkChampionship = await Championship.find({nickname: championshipName})

            let idChampionship = checkChampionship[0]._id ? checkChampionship[0]._id : ''
            
            if(checkChampionship.length === 0){
                const endDate = await page.$eval("section article meta[itemprop='endDate']", element => element.content)
                const startDate = await page.$eval("section article meta[itemprop='startDate']", element => element.content)
                
                const seasonStart = startDate.split("-",1).slice(-2)
                seasonStart[0] = seasonStart[0].slice(-2)
                const seasonEnd = endDate.split("-",1).slice(-2)
                seasonEnd[0] = seasonEnd[0].slice(-2)
                const season = seasonStart + "/" + seasonEnd
                
                const dateStarted = moment(startDate).format()
                const dateFinish =  moment(endDate).format()
                
                const championship = await Championship.create({
                    name: championshipName,
                    nickname: championshipName,
                    season,
                    dateStarted,
                    dateFinish
                })
                idChampionship = championship._id
            }
            
            
            let round = await page.$eval(".lista-jogos__navegacao--rodada", el => el.innerText)
            round = round.split("ª", 1)
            
            console.log("rodada",round)
            const games = await page.$$eval(".lista-jogos__jogo", el => el.map(game => game.innerText))       
            const acronym = await page.$$eval(".lista-jogos__jogo .equipes__sigla", el => el.map(game => game.textContent))
           
            for (let index = 0; index < games.length; index++) {
                const data = games[index].split("\n")
                const obj = {}
                if(data.indexOf("VEJA COMO FOI")!= -1){
                    data.pop()
                }

                const date = data[0].split(" ", 2)
                const hora = data[0].slice(-5)
                obj.matchDate = moment(date + " " + hora, 'DD/MM/YYYY hh:mm').format()
                
                if(data.length > 3){
                    obj.homeTeamResult = {
                        "team": data[1],
                        "goals": data[2]
                    }
                    obj.awayTeamResult = {
                        "team": data.at(-1),
                        "goals": data[3]
                    }
                    obj.winner = obj.homeTeamResult.goals > obj.awayTeamResult.goals ? 
                        obj.homeTeamResult.team :
                        obj.awayTeamResult.goals > obj.homeTeamResult.goals ?
                            obj.awayTeamResult.team : null
                }
                
                obj.idChampionship = idChampionship
                obj.round = round[0]
                obj.stage = 0
                obj.groupIndentification = "Sem grupo"
                obj.groupNumber = 1
                obj.status = 0
                
                const teamhome = data[1]
                const chechTeamHouse = await team.teamFind(teamhome)
                if(!chechTeamHouse){
                    const team = await teamsUtils.createTeam(teamhome,acronym[(index*2)],"club")
                    obj.idHomeTeam = team._id
                }else{
                    obj.idHomeTeam = chechTeamHouse._id
                }
                
                const teamAway = data.at(-1)
                const chechTeamAway = await team.teamFind(teamAway)
                if(!chechTeamAway){
                    const team = await teamsUtils.createTeam(teamAway,acronym[(index*2)+1],"club")
                    obj.idAwayTeam = team._id
                }else{
                    obj.idAwayTeam = chechTeamAway._id
                }
                obj.stadium = data[0].slice(15,-6)
                console.log(obj)
            }
        }

        await browser.close()

    }
}


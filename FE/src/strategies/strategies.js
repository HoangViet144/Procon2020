export const strategiesList = [
    { id: 1, name: 'Manual' },
    { id: 2, name: 'Funky' },

]
export const getActionFromStrategy = (strategy, matchInfo, teamID,brain,setBrain) => {
    if (!strategy) return
    if (strategy.id === 1) return
    if (strategy.id === 2) return greedyStrategy(matchInfo, teamID,brain,setBrain)


}
const randomStrategy = (matchInfo, teamID) => {
    return null
}
const greedyStrategy = (matchInfo, teamID,brain,setBrain) => {
    let map_point = []
    for (let i = 0; i < matchInfo.height; i++) {
        let row_point = []
        for (let j = 0; j < matchInfo.width; j++) {
            row_point.push({
                point: matchInfo.points[i][j],
                teamID: matchInfo.tiled[i][j]
            })
        }
        map_point.push(row_point)
    }
    for (let treasure of matchInfo.treasure) {
        if (treasure.status === 0) map_point[treasure.y - 1][treasure.x - 1].point += treasure.point
    }
    for (let obstacle of matchInfo.obstacles) {
        map_point[obstacle.y - 1][obstacle.x - 1].obstacle = true
    }
    let agentAction = []
    let agentInfo = []
    if (matchInfo.teams[0].teamID === teamID) agentInfo = matchInfo.teams[0].agents
    if (matchInfo.teams[1].teamID === teamID) agentInfo = matchInfo.teams[1].agents
    for (let agent of agentInfo) {
        const agentX = agent.x - 1 /// 0_index
        const agentY = agent.y - 1
        let dx_next = -2
        let dy_next = -2
        let curPoint = -99999
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                let neighborX = agentX + dx
                let neighborY = agentY + dy
                if (neighborX < 0 ||
                    neighborX >= matchInfo.width ||
                    neighborY < 0 ||
                    neighborY >= matchInfo.height)
                    continue
                if(map_point[neighborY][neighborX].obstacle) continue
                if (map_point[neighborY][neighborX].teamID === 0) {
                    console.log("map point",)
                    if (dx_next === -2) {
                        dx_next = dx
                        dy_next = dy
                        curPoint = map_point[neighborY][neighborX].point
                        console.log("curpoint", curPoint)
                    }
                    else {
                        if (map_point[neighborY][neighborX].point > curPoint) {
                            dx_next = dx
                            dy_next = dy
                            curPoint = map_point[neighborY][neighborX].point
                        }
                    }
                }
            }
        }
        if (dy_next !== -2) {
            map_point[agentY + dy_next][agentX + dx_next].teamID = teamID
            agentAction.push({
                curX: agentX + 1,
                curY: agentY + 1,
                dx: dx_next,
                dy: dy_next,
                type: "move",
                agentID: agent.agentID
            })

            continue /// found a way to move to empty cell with largest point
        }
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                let neighborX = agentX + dx
                let neighborY = agentY + dy
                if (neighborX < 0 ||
                    neighborX >= matchInfo.width ||
                    neighborY < 0 ||
                    neighborY >= matchInfo.height)
                    continue
                if(map_point[neighborY][neighborX].obstacle) continue
                if (map_point[neighborY][neighborX].teamID !== teamID) {
                    if (dx_next === -2) {
                        dx_next = dx
                        dy_next = dy
                        curPoint = map_point[neighborY][neighborX].point
                    }
                    else {
                        if (map_point[neighborY][neighborX].point > curPoint) {
                            dx_next = dx
                            dy_next = dy
                            curPoint = map_point[neighborY][neighborX].point
                        }
                    }
                }
            }
        }
        if (dy_next !== -2) {
            map_point[agentY + dy_next][agentX + dx_next].teamID = teamID
            agentAction.push({
                curX: agentX + 1,
                curY: agentY + 1,
                dx: dx_next,
                dy: dy_next,
                type: "remove",
                agentID: agent.agentID
            })
            continue /// found a way to remove to largest point cell of oponent
        }
        let dx= [1,1,0,-1,-1,-1,0,1]
        let dy= [0,1,1,1,0,-1,-1,-1]
        let neighborX = agentX + dx[brain[agent.agentID-1]]
        let neighborY = agentY + dy[brain[agent.agentID-1]]

        const canGo = (neighborX, neighborY) => {
          return !(neighborX < 0 ||
            neighborX >= matchInfo.width ||
            neighborY < 0 ||
            neighborY >= matchInfo.height|| 
            map_point[neighborY][neighborX].obstacle)
        }
        if(!canGo(neighborX,neighborY)){
          let randomDir = [0,1,2,3,4,5,6,7]
          for(let i = 0; i < 8; i++) {
            let t = Math.floor(Math.random()*7)
            let tmp = randomDir[i]
            randomDir[i] = randomDir[t]
            randomDir[t] = tmp
          }
          
          let cnt=0
          for(let i= brain[agent.agentID-1]; cnt<8; cnt++){
              let newDir = (brain[agent.agentID-1]+randomDir[cnt])% 8
              neighborX = agentX + dx[ newDir]
              neighborY = agentY + dy[ newDir]
              if(canGo(neighborX,neighborY)){

                let newBrain = [...brain]
                newBrain[agent.agentID] = newDir
                setBrain(newBrain)
                break
              }
          }
        }
        
        let type= 'remove'
        if (map_point[neighborY][neighborX].teamID == teamID) type='move'
        

        agentAction.push({
            curX: agentX + 1,
            curY: agentY + 1,
            dx: neighborX-agentX,
            dy: neighborY-agentY,
            type: type,
            agentID: agent.agentID
        })
    }
    return agentAction
}
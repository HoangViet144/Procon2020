export const validateMove = (curr, next, agentAction, mapInfo, teamID) => {
    if (!curr.id || !curr.x || !curr.y || !next.x || !next.y) {
        console.log("validate: null data")
        return false
    }
    let diffX = Math.abs(curr.x - next.x)
    let diffY = Math.abs(curr.y - next.y)
    if (diffX > 1 || diffY > 1) {
        console.log("validate: out of range")
        return false
    }
    console.log("valdate", agentAction)
    for (let ele of agentAction) {
        let agentX = ele.curX - 1 //0-index
        let agentY = ele.curY - 1
        if (ele.type === 'move') {
            agentX += ele.dx
            agentY += ele.dy
        }
        if (next.x === agentX && next.y === agentY) {
            console.log("validate: same place with other agent")
            return false
        }
    }
    console.log("validate ok")
    return true
}

export const validateMove = (curr, next) => {
    if (!curr.id || !curr.x || !curr.y || !next.x || !next.y) {
        console.log("validate failed")
        return
    }
    let diffX = Math.abs(curr.x - next.x)
    let diffY = Math.abs(curr.y - next.y)
    if (diffX > 1 || diffY > 1) {
        console.log("validate failed")
        return
    }
    console.log("validate ok")
    return true
}

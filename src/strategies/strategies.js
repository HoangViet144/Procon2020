export const strategiesList = [
    { id: 1, name: 'Manual' },
    { id: 2, name: 'Greedy' },
    { id: 3, name: 'random' }
]
export const getActionFromStrategy = (strategy) => {
    if (!strategy) return
    console.log("chose strategy", strategy.id)
    if (strategy.id === 1) return
    if (strategy.id === 3) return randomStrategy()

}
const randomStrategy = () => {
    console.log("random strategy")
    return null
}
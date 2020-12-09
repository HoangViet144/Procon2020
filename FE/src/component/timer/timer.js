export const calculateRemainingTime = (turnMillis, intervalMillis, startedAtUnixTime) => {
    let fullTurnMillis = turnMillis + intervalMillis;
    let startTime = startedAtUnixTime;
    let now = Date.now();
    //console.log("call time", now, startTime, now - startTime, Math.max(turnMillis - ((now - startTime) % fullTurnMillis), 0) / 1000)
    return Math.max(turnMillis - ((now - startTime) % fullTurnMillis), 0) / 1000;
}
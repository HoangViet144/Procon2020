import React, { useState, useEffect } from 'react'
import {
    Button,
    Grid,
    TextField,
    makeStyles
}
    from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getMatches, getMatchesById, sendAction } from '../../requestManagement/axiosRequest'
import { connect } from 'react-redux'
import Board from '../board/board'
import MatchInfoPanel from '../matchInfoPanel/matchInfoPanel'
import AgentsInfoPanel from '../agentInfoPanel/agentInfoPanel'
import { strategiesList, getActionFromStrategy } from '../../strategies/strategies'
import { calculateRemainingTime } from '../timer/timer'

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    button: {
        border: '1px solid black'
    }
}));

const TIME_THRESH_HOLD = 1
const Game = (props) => {
    const classes = useStyles();
    const [matchID, setMatchID] = useState(-1)
    /// remaining time
    const [counter, setCounter] = useState(0)

    /// use for set initial remaining time
    useEffect(() => {
        if (matchID !== -1 && props.matchInfo && props.matchesInfo) {
            setCounter(
                calculateRemainingTime(props.matchesInfo[matchID].turnMillis,
                    props.matchesInfo[matchID].intervalMillis,
                    props.matchInfo.startedAtUnixTime
                )
            )
        }
    }, [matchID, props.matchInfo, props.matchesInfo])

    /// use for set countdown clock
    useEffect(() => {
        if (matchID === -1 || !props.matchInfo || !props.matchesInfo) return
        const timer =
            setInterval(() => {
                console.log("set interval")
                if (counter === 0) {
                    clearInterval(timer)
                    return
                }
                setCounter(
                    calculateRemainingTime(props.matchesInfo[matchID].turnMillis,
                        props.matchesInfo[matchID].intervalMillis,
                        props.matchInfo.startedAtUnixTime
                    ))
            }, 1000)
        return () => clearInterval(timer);
    }, [counter]);

    /// send action when time < TIME_THRESH_HOLD
    useEffect(() => {
        if (counter < TIME_THRESH_HOLD && matchID !== -1) {
            console.log("force send action")
            handleSendAction()

        }
    }, [counter])

    /// use for send action of agents 
    const handleSendAction = () => {
        if (matchID !== -1 && props.agentAction && props.matchesInfo) {
            console.log("send action to server")
            sendAction(props.agentAction, props.matchesInfo[matchID].teamID)
        }
    }
    /// list of matches
    let options = []
    for (var id in props.matchesInfo) {
        options.push(props.matchesInfo[id])
    }

    const handleChosenMatch = (value) => {
        if (!value) return
        props.getMatchesById(value.id, props.matchesInfo[value.id - 1].teamID)
        setMatchID(value.id - 1)
    }

    const handleUpdateMatchManual = () => {
        if (matchID === -1) return
        let matchID_tosend = matchID + 1
        let teamID_tosend = props.matchesInfo[matchID].teamID
        console.log(matchID_tosend, teamID_tosend)
        props.getMatchesById(matchID_tosend, teamID_tosend)
    }

    const handleChosenStrategy = (value) => {
        getActionFromStrategy(value)
    }
    return (
        <Grid
            className={classes.root}
            container
            spacing={5}
        >-
            <Grid
                item
                container
                spacing={3}
            >
                <Grid
                    item
                    md={5}
                >
                    <Button className={classes.button} onClick={props.getMatches}>Get matches</Button>
                </Grid>
                <Grid
                    item
                    md={5}

                >
                    <Autocomplete
                        options={options}
                        getOptionLabel={(option) => option.id.toString()}
                        onChange={(event, value) => handleChosenMatch(value)}
                        renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, style: { fontSize: '0.75em' } }} label="Chọn trận đấu" variant="outlined" />}
                    />

                </Grid>
            </Grid>
            <Grid
                item
                md={6}
            >
                <MatchInfoPanel matchInfo={matchID === -1 ? null : props.matchesInfo[matchID]} />
                <br />

                <br />
                <Autocomplete
                    options={strategiesList}
                    defaultValue={{ id: 1, name: "Manual" }}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => handleChosenStrategy(value)}
                    renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, style: { fontSize: '0.75em' } }} label="Choose strategy" variant="outlined" />}
                />
                <br />
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                    >
                        <p>Time left: {counter}</p>
                    </Grid>
                    <Grid
                        item
                    >
                        <Button className={classes.button} onClick={handleUpdateMatchManual}>Update current match</Button>

                    </Grid>
                    <Grid
                        item
                    >
                        <Button className={classes.button} onClick={handleSendAction}>Send action</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                md={6}
            >
                <AgentsInfoPanel />
            </Grid>
            <Grid
                item
                md={12}
            >
                <Board teamID={matchID === -1 ? null : props.matchesInfo[matchID].teamID} />
            </Grid>

        </Grid>
    )
}
const mapStateToProps = (state) => {
    return {
        matchesInfo: state.matchesInfo,
        matchInfo: state.matchInfo,
        agentAction: state.agentAction
    }
}
export default connect(mapStateToProps, { getMatches, getMatchesById })(Game)
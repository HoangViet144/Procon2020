import React, { useState, useEffect } from 'react'
import {
    Button,
    Grid,
    TextField,
    makeStyles
}
    from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux'

import Board from '../board/board'
import MatchInfoPanel from '../matchInfoPanel/matchInfoPanel'
import AgentsInfoPanel from '../agentInfoPanel/agentInfoPanel'

import { strategiesList, getActionFromStrategy } from '../../strategies/strategies'
import { calculateRemainingTime } from '../timer/timer'
import { getMatches, getMatchesById, sendAction } from '../../requestManagement/axiosRequest'
import { setAgentAction,setSendState,setBrain } from '../../redux/actions'

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
const UPDATE_THRESH_HOLD = 1000
const Game = (props) => {
    const classes = useStyles();
    const [strategy, setStrategy] = useState({})
    const [matchID, setMatchID] = useState(-1)
    const [teamID, setTeamID] = useState(-1)
    /// remaining time
    const [counter, setCounter] = useState(0)

    useEffect(()=>{
        let dir = [-1,0,1]
        let brain=[]
        for (let i=0;i<8;i++){
            brain.push(Math.floor(Math.random() * 7))
        }
        props.setBrain(brain)
    },[])
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
        let updater=null
        if (counter < 2 * TIME_THRESH_HOLD && matchID !== -1) {
            autoGenerateAction()
        }
        if (counter < TIME_THRESH_HOLD && matchID !== -1 && !props.sendState) {
            console.log("force send action")
            handleSendAction()
            props.setSendState(true)
        }
        if(counter>0){
          clearInterval(updater)
        }
    }, [counter])

    // useEffect(()=>{
    //   const updater =
    //         setInterval(() => {
    //           if (matchID === -1 || teamID === -1) return
    //           let matchID_tosend = props.matchesInfo[matchID].id
    //           let teamID_tosend = teamID
    //           props.getMatchesById(matchID_tosend, teamID_tosend)
    //         }, UPDATE_THRESH_HOLD)
    //     return () => clearInterval(updater);
    // })
    /// use for send action of agents 
    const handleSendAction = () => {
        if (matchID !== -1 && teamID !== -1 && props.agentAction && props.matchesInfo) {
            console.log("send action to server")
            sendAction(props.agentAction, props.matchesInfo[matchID].id)
            props.setSendState(true)
        }
    }

    /// auto generate actions by greedy strategy if no decision was made
    const autoGenerateAction = () => {
        if (!props.agentAction) return //happend when update match manual and agentAction not in store yet
        let madeDecision = false
        for (let agent of props.agentAction) {
            if (agent.dx !== 0 || agent.dy !== 0) {
                madeDecision = true
                break
            }
        }
        if (!madeDecision) {
            handleChosenStrategy({ id: 2, name: 'Greedy' })
        }
    }

    /// list of matches
    let options = []
    for (var id in props.matchesInfo) {
        options.push(props.matchesInfo[id])
    }

    const handleChosenMatch = (value) => {
        if (!value) return
        props.getMatchesById(value.id, value.teamID,-1)
        let ind = 0
        let cnt = 0
        for (let i in props.matchesInfo) {
            if (props.matchesInfo[i].id === value.id) ind = cnt
            cnt++
        }
        console.log("ind ",ind)
        setTeamID(value.teamID)
        setMatchID(ind)
    }
    const handleGenerateAction = () => {
        if (!strategy.id) return
        handleChosenStrategy(strategy)
    }
    const handleUpdateMatchManual = () => {
        if (matchID === -1 || teamID === -1) return
        let matchID_tosend = props.matchesInfo[matchID].id
        let teamID_tosend = teamID
        props.getMatchesById(matchID_tosend, teamID_tosend,-1)
        props.setSendState(false)
    }

    const handleChosenStrategy = (value) => {
        if (props.matchInfo && props.agentAction && teamID !== -1) {
            if (!value) return
            if (value && value.id === 1) return //manual and not choose any strategy
            let actionList = getActionFromStrategy(value, props.matchInfo, teamID, props.brain,props.setBrain)
            props.setAgentAction(actionList)
            setStrategy(value)
        }
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
                        
                    </Grid>
                   
                </Grid>
            </Grid>
            <Grid
                item
                md={4}
            >
                
            </Grid>
            <Grid
                item
                container
                md={12}
            >
              <Grid
                item
                md={9}
              >
                <Board teamID={matchID === -1 ? null : teamID} />
              </Grid>
              <Grid
                item
                md={3}
              >
                <AgentsInfoPanel />
                <p>Time left: {counter}</p>
                  <Grid
                      item
                  >
                      <Button className={classes.button} onClick={handleUpdateMatchManual}>Update current match</Button>

                  </Grid>
                  <Grid
                      item
                  >
                      <Button className={classes.button} onClick={handleGenerateAction}>Generate action</Button>

                  </Grid>
                  <Grid
                      item
                  >
                      <Button className={classes.button} onClick={handleSendAction}>Send action</Button>
                  </Grid>
              </Grid>
            </Grid>

        </Grid>
    )
}
const mapStateToProps = (state) => {
    return {
        matchesInfo: state.matchesInfo,
        matchInfo: state.matchInfo,
        agentAction: state.agentAction,
        sendState: state.sendState,
        brain: state.brain
    }
}
export default connect(mapStateToProps, { getMatches, getMatchesById, setAgentAction, setSendState,setBrain })(Game)
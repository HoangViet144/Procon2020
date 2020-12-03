import React, { useState } from 'react'
import {
    Button,
    Grid,
    TextField,
    makeStyles
}
    from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getMatches, getMatchesById } from '../../requestManagement/axiosRequest'
import { connect } from 'react-redux'
import Board from '../board/board'
import MatchInfoPanel from '../matchInfoPanel/matchInfoPanel'
import AgentsInfoPanel from '../agentInfoPanel/agentInfoPanel'
import { strategiesList } from '../../strategies/strategies'

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
const Game = (props) => {
    const classes = useStyles();
    const [matchID, setMatchID] = useState(-1)

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
    }
    const handleChosenStrategy = (value) => {
        if (value === 1) return
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
                    <Button className={classes.button} onClick={handleUpdateMatchManual}>Update current match</Button>
                    <Button className={classes.button} >Send action</Button>
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
                spacing={10}
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
        matchesInfo: state.matchesInfo

    }
}
export default connect(mapStateToProps, { getMatches, getMatchesById })(Game)
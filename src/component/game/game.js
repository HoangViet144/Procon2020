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

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
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
        props.getMatchesById(value.id)
        setMatchID(value.id - 1)
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
                    <Button onClick={props.getMatches}>Get matches</Button>
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
                <MatchInfoPanel matchID={matchID} />
            </Grid>
            <Grid
                item
                md={6}
            >
                <AgentsInfoPanel matchID={matchID} />
            </Grid>
            <Grid
                item
                md={12}
            >
                <Board />
            </Grid>
            <Grid
                item
                md={5}
            ></Grid>
        </Grid>
    )
}
const mapStateToProps = (state) => {
    return {
        matchesInfo: state.matchesInfo

    }
}
export default connect(mapStateToProps, { getMatches, getMatchesById })(Game)
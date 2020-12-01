import React from 'react'
import {
    Button,
    Grid
}
    from '@material-ui/core'
import { getMatches } from '../manageRequest/axiosRequest'
import { connect } from 'react-redux'

const Board = (props) => {
    return (
        <Grid>
            <Grid
                item
            >
                <Button onClick={props.getMatches}>Get matches</Button>
                <Button onClick={props.getMatch}> Get match with id {props.matchId} </Button>
            </Grid>
        </Grid>

    )
}
const mapStateToProps = (state) => {
    return {
        matchId: state.matchesInfo ? state.matchesInfo.id : null
    }
}
export default connect(mapStateToProps, { getMatches })(Board)
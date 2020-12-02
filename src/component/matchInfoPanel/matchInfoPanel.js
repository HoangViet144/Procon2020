import React from 'react'
import {
    Button,
    Grid,
    TextField,
    Table,
    TableBody,
    TableRow,
    TableCell,
    makeStyles
}
    from '@material-ui/core'
import { connect } from 'react-redux'
const useStyles = makeStyles((theme) => ({
    root: {

    }
}));
const InfoPanel = (props) => {
    const classes = useStyles();
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>team</TableCell>
                    <TableCell>Room</TableCell>
                    <TableCell>turns</TableCell>
                    <TableCell>turn sec</TableCell>
                    <TableCell>interval sec</TableCell>
                </TableRow>
                {props.matchesInfo && props.matchID != -1 ?
                    <TableRow>
                        <TableCell>{props.matchesInfo[props.matchID].teamID}</TableCell>
                        <TableCell>{props.matchesInfo[props.matchID].matchTo}</TableCell>
                        <TableCell>{props.matchesInfo[props.matchID].id}</TableCell>
                        <TableCell>{props.matchesInfo[props.matchID].turns}</TableCell>
                        <TableCell>{props.matchesInfo[props.matchID].turnMillis}</TableCell>
                        <TableCell>{props.matchesInfo[props.matchID].intervalMillis}</TableCell>
                    </TableRow>
                    : null}
            </TableBody>
        </Table>
    )
}
const mapStateToProps = (state) => {
    return {
        matchesInfo: state.matchesInfo

    }
}
export default connect(mapStateToProps, {})(InfoPanel)
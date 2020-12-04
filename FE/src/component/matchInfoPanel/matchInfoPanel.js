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
                {props.matchInfo ?
                    <TableRow>
                        <TableCell>{props.matchInfo.teamID}</TableCell>
                        <TableCell>{props.matchInfo.matchTo}</TableCell>
                        <TableCell>{props.matchInfo.id}</TableCell>
                        <TableCell>{props.matchInfo.turns}</TableCell>
                        <TableCell>{props.matchInfo.turnMillis}</TableCell>
                        <TableCell>{props.matchInfo.intervalMillis}</TableCell>
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
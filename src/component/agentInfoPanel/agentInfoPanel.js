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
                    <TableCell>AgentID</TableCell>
                    <TableCell>CurX</TableCell>
                    <TableCell>CurY</TableCell>
                    <TableCell>dx</TableCell>
                    <TableCell>dy</TableCell>
                    <TableCell>type</TableCell>
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
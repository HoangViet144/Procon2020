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
    console.log(props.agentAction)
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
                {props.agentAction && props.agentAction.map((ele, ind) => {
                    return (
                        <TableRow key={ind}>
                            <TableCell>{ele.agentID}</TableCell>
                            <TableCell>{ele.curX}</TableCell>
                            <TableCell>{ele.curY}</TableCell>
                            <TableCell>{ele.dx}</TableCell>
                            <TableCell>{ele.dy}</TableCell>
                            <TableCell>{ele.type}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
const mapStateToProps = (state) => {
    return {
        agentAction: state.agentAction

    }
}
export default connect(mapStateToProps, {})(InfoPanel)
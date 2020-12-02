import React from 'react'
import {
    Button,
    Grid,
    TextField,
    makeStyles
}
    from '@material-ui/core'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    button: {
        border: '1px solid black',
        backgroundColor: 'white',
        height: '10px',
        width: '10px'
    }
}));
const Board = (props) => {
    const classes = useStyles();
    let buttonGroup = []
    if (props.matchInfo) {
        for (var i = 0; i < props.matchInfo.height; i++) {
            let buttonRow = []
            for (var j = 0; j < props.matchInfo.width; j++) {
                buttonRow.push(
                    <Button key={i + j} className={classes.button} />
                )
            }
            buttonGroup.push(
                <Grid item>
                    {buttonRow}
                </Grid>
            )
        }
    }


    return (
        <Grid
            container
            className={classes.root}
        >
            {buttonGroup}
        </Grid>
    )
}
const mapStateToProps = (state) => {
    return {
        matchInfo: state.matchInfo

    }
}
export default connect(mapStateToProps)(Board)
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
        maxHeight: '70px',
        maxWidth: '70px',
        minWidth: '70px',
        minHeight: '70px',
    }
}));
const Board = (props) => {
    const classes = useStyles();
    let buttonGroupInfo = []
    let buttonGroup = []
    if (props.matchInfo) {
        for (var i = 0; i < props.matchInfo.height; i++) {
            let rowInfo = []
            for (var j = 0; j < props.matchInfo.width; j++) {
                let info = {
                    point: props.matchInfo.points[i][j],
                    obstacles: false
                }
                rowInfo.push(info)
            }
            buttonGroupInfo.push(rowInfo)
        }
        console.log(buttonGroupInfo)
        for (var id in props.matchInfo.treasure) {
            let x = props.matchInfo.treasure[id].x
            let y = props.matchInfo.treasure[id].y
            let point = props.matchInfo.treasure[id].point
            let status = props.matchInfo.treasure[id].status
            buttonGroupInfo[y - 1][x - 1].treasure = {
                point: point,
                status: status
            }
        }
        for (var id in props.matchInfo.obstacles) {
            let x = props.matchInfo.obstacles[id].x
            let y = props.matchInfo.obstacles[id].y
            buttonGroupInfo[y - 1][x - 1].obstacles = true
        }
        console.log(props.matchInfo.height, props.matchInfo.width)
        for (var i = 0; i < props.matchInfo.height; i++) {
            let buttonRow = []
            for (var j = 0; j < props.matchInfo.width; j++) {
                let textOut = buttonGroupInfo[i][j].point.toString()
                if (!buttonGroupInfo[i][j].obstacles && buttonGroupInfo[i][j].treasure && buttonGroupInfo[i][j].treasure.status === 0) {
                    textOut += ",T:" + buttonGroupInfo[i][j].treasure.point.toString()
                }
                if (buttonGroupInfo[i][j].obstacles) {
                    textOut = "O"
                }

                buttonRow.push(
                    <Button
                        key={i + j}
                        className={classes.button}
                        disabled={buttonGroupInfo[i][j].obstacles}
                    >
                        {textOut}
                    </Button>
                )
            }
            buttonGroup.push(
                <Grid item key={i} md={12}>
                    {buttonRow}
                </Grid>
            )
        }
    }


    return (
        <Grid
            container
            className={classes.root}
            md={12}
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
import React from 'react'
import {
    Button,
    Grid,
    TextField,
    makeStyles
}
    from '@material-ui/core'
import { connect } from 'react-redux'
import WallImage from './wall.png'

const TEAM1 = 1 ///? id luon la 1 va 2??? 1 la team minh???
const TEAM2 = 2
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
        maxHeight: '60px',
        maxWidth: '60px',
        minWidth: '60px',
        minHeight: '60px',
        padding: '0px',
        margin: '0px'
    },
    agentTeam1: {
        backgroundColor: 'FireBrick !important'
    },
    agentTeam2: {
        backgroundColor: 'DarkSlateBlue !important'
    },
    tiledTeam1: {
        backgroundColor: 'OrangeRed'
    },
    tiledTeam2: {
        backgroundColor: 'DeepSkyBlue'
    }
}));
const Board = (props) => {
    const classes = useStyles();
    let buttonGroupInfo = []
    let buttonGroup = []
    if (props.matchInfo) {
        /// get point
        for (var i = 0; i < props.matchInfo.height; i++) {
            let rowInfo = []
            for (var j = 0; j < props.matchInfo.width; j++) {
                let info = {
                    point: props.matchInfo.points[i][j],
                    obstacles: false,
                    css: ["button"]
                }
                rowInfo.push(info)
            }
            buttonGroupInfo.push(rowInfo)
        }

        /// get tiled
        for (var i = 0; i < props.matchInfo.height; i++) {
            for (var j = 0; j < props.matchInfo.width; j++) {
                if (props.matchInfo.tiled[i][j] == TEAM1) {
                    buttonGroupInfo[i][j].css.push("tiledTeam1")
                }
                if (props.matchInfo.tiled[i][j] == TEAM2) {
                    buttonGroupInfo[i][j].css.push("tiledTeam2")
                }
            }
        }

        /// get treasure
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
        /// get obstacles
        for (var id in props.matchInfo.obstacles) {
            let x = props.matchInfo.obstacles[id].x
            let y = props.matchInfo.obstacles[id].y
            buttonGroupInfo[y - 1][x - 1].obstacles = true
        }

        /// get current agents' position
        if (props.matchInfo.teams[0].teamID === TEAM1) {
            for (let id in props.matchInfo.teams[0].agents) {
                let x = props.matchInfo.teams[0].agents[id].x
                let y = props.matchInfo.teams[0].agents[id].y
                let agentID = props.matchInfo.teams[0].agents[id].agentID
                buttonGroupInfo[y - 1][x - 1].agentID = agentID
                buttonGroupInfo[y - 1][x - 1].css.push("agentTeam1")
            }
        }

        if (props.matchInfo.teams[1].teamID === TEAM2) {
            for (let id in props.matchInfo.teams[1].agents) {
                let x = props.matchInfo.teams[1].agents[id].x
                let y = props.matchInfo.teams[1].agents[id].y
                let agentID = props.matchInfo.teams[1].agents[id].agentID
                buttonGroupInfo[y - 1][x - 1].agentID = agentID
                buttonGroupInfo[y - 1][x - 1].css.push("agentTeam2")
            }
        }

        /// render output
        for (var i = 0; i < props.matchInfo.height; i++) {
            let buttonRow = []
            for (var j = 0; j < props.matchInfo.width; j++) {
                let textOut = buttonGroupInfo[i][j].point.toString()
                if (!buttonGroupInfo[i][j].obstacles &&
                    buttonGroupInfo[i][j].treasure &&
                    buttonGroupInfo[i][j].treasure.status === 0) {
                    textOut += ",T:" + buttonGroupInfo[i][j].treasure.point.toString()
                }
                if (buttonGroupInfo[i][j].obstacles) {
                    textOut = "O"
                }
                let css = []
                for (var id in buttonGroupInfo[i][j].css) {
                    css.push(classes[buttonGroupInfo[i][j].css[id]])
                }
                buttonRow.push(
                    <Button
                        key={i + j}
                        className={css.join(' ')}
                        disabled={buttonGroupInfo[i][j].obstacles}
                    >
                        {buttonGroupInfo[i][j].obstacles ?
                            <img src={WallImage} style={{ width: '40px' }}></img> :
                            textOut
                        }
                    </Button >

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
import React, { useEffect, useState } from 'react'
import {
    Button,
    Grid,
    TextField,
    makeStyles
}
    from '@material-ui/core'
import { connect } from 'react-redux'
import WallImage from './wall.png'
import { validateMove } from './validation'

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
    },
    suggestTeam1: {
        //  backgroundColor: 'yellow',
        //animation: '$blinkingBackground 2s infinite',
        animation: '$glowing 1500ms infinite'
    },
    '@keyframes glowing': {
        '0%': { backgroundColor: 'White', },
        '50%': { backgroundColor: 'LightCyan', },
        '100%': { backgroundColor: 'LightBlue', }
    },
}));
const Board = (props) => {
    const MY_TEAM = props.teamID
    const classes = useStyles();
    let [buttonGroup, setButtonGroup] = useState([])
    let [buttonGroupInfo, setButtonGroupInfo] = useState([])
    const [decision, setDecision] = useState({
        id: null,
        x: null,
        y: null
    })

    const handleChosen = (x, y) => {
        if (decision.id) {
            console.log("validate begin")
            validateMove(decision, { x: x, y: y })
            setDecision({
                id: null,
                x: null,
                y: null
            })
            let newButtonGroupInfo = [...buttonGroupInfo]
            for (var i = 0; i < props.matchInfo.height; i++) {
                for (var j = 0; j < props.matchInfo.width; j++) {
                    newButtonGroupInfo[i][j].css = newButtonGroupInfo[i][j].css.filter(item => item !== "suggestTeam1")
                }
            }
            setButtonGroupInfo(newButtonGroupInfo)

            return
        }
        let newButtonGroupInfo = [...buttonGroupInfo]
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                let neighborX = x + dx
                let neighborY = y + dy
                if (neighborX < 0 ||
                    neighborX >= props.matchInfo.width ||
                    neighborY < 0 ||
                    neighborY >= props.matchInfo.height)
                    return

                if (newButtonGroupInfo[x][y].teamID !== MY_TEAM) return;
                console.log(x, y, "update button")
                newButtonGroupInfo[neighborX][neighborY].css.push("suggestTeam1")
            }
        }
        setDecision({
            id: buttonGroupInfo[x][y].agentID,
            x: x,
            y: y
        })
        setButtonGroupInfo(newButtonGroupInfo)
    }
    useEffect(() => {

        if (!props.matchInfo) return
        console.log("call1")
        let buttonGroupInfo = []
        /// get point
        for (var i = 0; i < props.matchInfo.height; i++) {
            let rowInfo = []
            for (var j = 0; j < props.matchInfo.width; j++) {
                let info = {
                    point: props.matchInfo.points[i][j],
                    obstacles: false,
                    css: ["button"],
                    teamID: 0
                }
                rowInfo.push(info)
            }
            buttonGroupInfo.push(rowInfo)
        }

        /// get tiled
        for (let i = 0; i < props.matchInfo.height; i++) {
            for (let j = 0; j < props.matchInfo.width; j++) {
                if (props.matchInfo.tiled[i][j] == MY_TEAM) {
                    buttonGroupInfo[i][j].css.push("tiledTeam1")
                }
                if (props.matchInfo.tiled[i][j] !== MY_TEAM && props.matchInfo.tiled[i][j]) {
                    buttonGroupInfo[i][j].css.push("tiledTeam2")
                }
            }
        }

        /// get treasure
        for (let id in props.matchInfo.treasure) {
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
        for (let id in props.matchInfo.obstacles) {
            let x = props.matchInfo.obstacles[id].x
            let y = props.matchInfo.obstacles[id].y
            buttonGroupInfo[y - 1][x - 1].obstacles = true
        }

        /// get current agents' position
        for (let ind in props.matchInfo.teams) {
            if (props.matchInfo.teams[ind].teamID === MY_TEAM) {
                for (let id in props.matchInfo.teams[ind].agents) {
                    let x = props.matchInfo.teams[ind].agents[id].x
                    let y = props.matchInfo.teams[ind].agents[id].y
                    let agentID = props.matchInfo.teams[ind].agents[id].agentID
                    buttonGroupInfo[y - 1][x - 1].agentID = agentID
                    buttonGroupInfo[y - 1][x - 1].css.push("agentTeam1")
                    buttonGroupInfo[y - 1][x - 1].teamID = props.matchInfo.teams[ind].teamID
                }
            }
            if (props.matchInfo.teams[ind].teamID !== MY_TEAM) {
                for (let id in props.matchInfo.teams[ind].agents) {
                    let x = props.matchInfo.teams[ind].agents[id].x
                    let y = props.matchInfo.teams[ind].agents[id].y
                    let agentID = props.matchInfo.teams[ind].agents[id].agentID
                    buttonGroupInfo[y - 1][x - 1].agentID = agentID
                    buttonGroupInfo[y - 1][x - 1].css.push("agentTeam2")
                    buttonGroupInfo[y - 1][x - 1].teamID = props.matchInfo.teams[ind].teamID
                }
            }
        }
        setButtonGroupInfo(buttonGroupInfo)
    }, [props.matchInfo])
    useEffect(() => {
        if (!props.matchInfo) return

        console.log("call", buttonGroupInfo)
        let buttonGroup = []
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
                        onClick={handleChosen.bind(this, i, j)}
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
        setButtonGroup(buttonGroup)
    }, [buttonGroupInfo])


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
import React from 'react'
import {
    Button,
    Grid
}
    from '@material-ui/core'
import { getMatches } from '../manageRequest/axiosRequest'

const Board = (props) => {
    return (
        // <Grid>
        //     <Grid
        //         item
        //     >
        //         <Button onClick={getUsers}>Get matches</Button>
        //     </Grid>
        // </Grid>
        <button onClick={getMatches}>bam vo</button>
    )
}
export default Board
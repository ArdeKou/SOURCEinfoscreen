import React from 'react'
import { mergeClasses } from '@material-ui/styles';

// parse bus line data and render

const Line = ({ classes, line, StyledTableCell, StyledTableRow }) => {
    //parse departure time from 1234 string to 12:34
    const time = line.time[0] + line.time[1] + ':' + line.time[2] + line.time[3]
    return (
        <StyledTableRow className={mergeClasses.root}>
            <StyledTableCell className={classes.body}>
                {line.code}
            </StyledTableCell>
            <StyledTableCell>
                {time}
            </StyledTableCell>
            </StyledTableRow>
        )
}

export default Line
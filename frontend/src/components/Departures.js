import React from 'react'
import Line from './Line'

// departures component
// renders upcoming bus departures from bus stop
// TODO: if else necessary? Without it departures.slice results in error

const Departures = ({ classes, departures, StyledTableCell, StyledTableRow }) => {

    // seperate departure data into individual bus lines
    // call Line component to render line data
    const renderLines = (departures) => {
        return (

            departures.slice(0,5).map(line => (
                // slice used to limit amount of show lines
                    <Line classes={classes} StyledTableCell={StyledTableCell} StyledTableRow={StyledTableRow} key={line.code + line.time} line={line} />
            )      
                
        )
    )}

    // if component was called with defined departures parameter
    // call Line component
    // else wait for viable departures variable
    if (departures) {
        return (
            <div>
                {renderLines(departures)}
            </div>               
        )
    } else {
        return null
    }
}

export default Departures
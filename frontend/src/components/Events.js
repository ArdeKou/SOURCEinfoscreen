import React from 'react'
import Event from './Event'

// Render events

const Events = ({ events, TableCell, TableRow, TableBody, TableHead, Table, classes }) => {

    const renderEvents = events => {
        return (
            events.map(event => (
                    <Event classes={classes} Table={Table} TableHead={TableHead} TableBody={TableBody} TableCell={TableCell} TableRow={TableRow} key={event.id} event={event} />
            ))
        )
    }

    if (events) {
        if (events.length === 0) {
            return (
                <div>
                    No upcoming events
                </div>
            )
        } else {
            return(
                <Table className={classes.table}>
                <TableHead className={classes.head}>
                    <TableRow>
                        <TableCell align="left">Tulevat tapahtumat</TableCell>
                        <TableCell align="right">pvm</TableCell>
                        <TableCell align="right">klo</TableCell>
                    </TableRow>
                </TableHead>
                    {renderEvents(events)}
                </Table>
                    
            )
        }
    } else {
        return (
            <div>
                Loading
            </div>
        )
    }
}

export default Events
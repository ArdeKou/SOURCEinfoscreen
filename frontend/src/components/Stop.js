import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Departures from './Departures'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 16,
    },
    body: {
        fontSize: 16,
        size: 'medium',
        aling: 'right',
    },
}))(TableCell)
const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
            
        },
    },
}))(TableRow)
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
        width: 145,
        overflowX: 'auto',
    },
    table: {
        minWidth: 100,
    },
}))

// individual bus stop component

const Stop = ({ stop }) => {
    // state hooks
    const [departures, setDepartures] = useState([])
    const [seconds, setSeconds] = useState(0)

    const REFRESHRATE = 30      // departures refresh interval in seconds

    // counter for departure updates
    // resets when counter reaches REFRESHRATE
    useEffect(() => {
        let interval = setInterval(() => {
            setSeconds(seconds => seconds + 1)
        }, 1000)
        if (seconds === REFRESHRATE){
            setSeconds(seconds => 0)
            return () => clearInterval(interval)
        } else {
            return () => clearInterval(interval)
        }
    }, [seconds])

    // fetch individual stop data
    // check if counter has been reset
    // if so, fetch new data
    useEffect(() => {
        const fetchDepartures = async () => {
            await axios.get(
                `http://localhost:8888/api/stops/${stop.code}`
            )
            .then(response => {
                setDepartures(response.data.map(item => item.departures))
            })
        }
        if (seconds === 0){
            fetchDepartures()
        }
    }, [stop.code, seconds])

    // render stop code and name
    // call departures component
    const classes = useStyles();
    return(
        <div className='stopColumn'>
            <Paper className={classes.paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>{stop.name} {stop.code}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Departures classes={classes} StyledTableCell={StyledTableCell} StyledTableRow={StyledTableRow} departures={departures[0]} />
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
}

export default Stop
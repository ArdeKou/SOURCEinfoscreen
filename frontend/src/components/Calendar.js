import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Events from './Events'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core' 

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 150,
    },
    head: {
        fontSize: 16,
    }
}))

// Events from sourcery.rocks events calendar

const Calendar = () => {
    const [events, setEvents] = useState()

    // Get list of events
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(
                'http://localhost:8888/api/events'
            )
            .then(response => {
                setEvents(response.data.events.map(item => item))
            })
        }
        fetchData()
    }, [])
    const classes = useStyles()
    return (
        <div className='calendar'>
            <Paper className={classes.root}>
                <Events classes={classes} Table={Table} TableHead={TableHead} TableBody={TableBody} TableCell={TableCell} TableRow={TableRow} events={events}/>

            </Paper>
            
        </div>
    )
}

export default Calendar
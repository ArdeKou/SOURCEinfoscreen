import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Stop from './Stop'
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { mergeClasses, ThemeProvider } from '@material-ui/styles';
import { textAlign, fontWeight, fontSize, Box } from '@material-ui/system';
import { Card, Paper } from '@material-ui/core'


const useStyles = makeStyles({
    card: {
        width: '100%',
      },
      title: {
        fontSize: 35,
        fontWeight: 'fontWeightBold',
        textAlign: 'center',
        background: 'Black'
      },
      root: {
          
      },
      paper: {
          width: '100%',
      }
})

// Bus stops info component

const Bus = () => {
    // state hook
    const [stops, setStops] = useState([])
    const maxStops = 4      // number of stops to render

    // fetch stops data to stops stateHook
    // returned stops determined in backend
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(
                'http://localhost:8888/api/stops'
            )
            .then(response => {
                setStops(response.data.map(item => item))
            })
        }
        fetchData()
    }, [])

    // render a subcomponent for each bus stop found
    const renderStops = () => {
        return (
            stops.slice(0,maxStops).map( stop =>        // last of the returned stops
                <Stop key={stop.code} stop={stop} />    // never has departures
            )                                           // so we slice it from the results
        )                                               // reason unclear, faulty api or unused bus stop
    }
    const mergeClasses = useStyles()
    // call Stop components
    return (
            <Card className={mergeClasses.card}> 
                <Paper className={mergeClasses.title}>
                    
                <Typography className={mergeClasses.title} color="textSecondary">
                        DÖSÄT
                </Typography>
                </Paper>
                <CardContent className='busContainer'>
                    
                    {renderStops()}
                </CardContent>
            </Card>  
    )
}

export default Bus
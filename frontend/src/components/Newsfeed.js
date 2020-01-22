import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//Material ui style
const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

// RSS Newsfeed, backend directs to feed
const Newsfeed = () => {
    const [feed, setFeed] = useState()
    const [seconds, setSeconds] = useState(0)
    const REFRESHRATE = 300

    // Refreshtimer
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

    // fetch from backend
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(
                'http://localhost:8888/api/news'
            )
            .then(response => {
                setFeed(response.data)
            })
        }
        if (seconds === 0){
            fetchData()
        }
    }, [seconds])

    // render 10 newest news titles
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>
    if (feed){
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color='textSecondary' gutterBottom>
                        Onion news
                    </Typography>
            {feed.items.slice(0,6).map(item =>(
                <Typography align="center" className='news' key={item.guid}>
                    {item.title} {bull}
                </Typography>
            ))}
                </CardContent>    
            </Card>
        )
    } else {
        return 'Loading news'
    }
}

export default Newsfeed
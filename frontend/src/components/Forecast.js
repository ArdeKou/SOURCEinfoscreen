import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
    },
}));


// Hourly weather component
const Hourly = ({ hourly }) => {
    const classes = useStyles();  
    return (
      <TableBody>
        <TableRow className={classes.head}>
            <TableCell>Today</TableCell>
          {hourly.map(hour =>(    
                <TableCell key={hour.DateTime}>
                    {hour.DateTime[11]}{hour.DateTime[12]}:00
                </TableCell>
            // above results in 04:00 at 4 AM etc     
          ))}
        </TableRow>
        <TableRow>
        <TableCell className={classes.head}>Temperature</TableCell>
          {hourly.map(hour =>(    
                <TableCell key={hour.DateTime}>
                    {hour.Temperature.Value}{hour.Temperature.Unit}
                </TableCell>
            // above results in 04:00 at 4 AM etc     
          ))}
        </TableRow>
        <TableRow>
        <TableCell className={classes.head}>Weather</TableCell>
          {hourly.map(hour =>(    
                <TableCell key={hour.DateTime}>
                    {hour.IconPhrase}
                </TableCell>
            // above results in 04:00 at 4 AM etc     
          ))}
        </TableRow>
      </TableBody>
    )
}
// Daily weather componenet
const Daily = ({ daily }) => {
    const classes = useStyles()
    return (
        <TableBody>
        <TableRow className={classes.head}>
            <TableCell>Week</TableCell>
        {daily.map(day =>(
            <TableCell key={day.Date}>
                {day.Date[8]}{day.Date[9]}.{day.Date[5] === '0' ? '' : day.Date[5]}{day.Date[6]}
            </TableCell>    
        ))}
        </TableRow>
        <TableRow>
            <TableCell className={classes.head}>Temperature</TableCell>
        {daily.map(day =>(
            <TableCell key={day.Date}>
                {day.Temperature.Maximum.Value}C
            </TableCell>    
        ))}
        </TableRow>
        <TableRow>
            <TableCell className={classes.head}>Weather</TableCell>
        {daily.map(day =>(
            <TableCell key={day.Date}>
                {day.Day.IconPhrase} {day.Day.HasPrecipitation ? day.Day.PrecipitationIntensity +' '+ day.Day.PrecipitationType : ''}
            </TableCell>    
        ))}
        </TableRow>
        </TableBody>
    )
}

// Forecast root component
const Forecast = () => {
    // state hooks
    const [hourly, setHourly] = useState()
    const [daily, setDaily] = useState()
    const [seconds, setSeconds] = useState() //timer
    const REFRESHRATE = 3600 // in seconds

    // Timer effect
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

    // Fetch weather from backend, end url with /local for hardcoded debug data -> avoids using api tokens
    useEffect(() => {
        const fetchHourly = async () => {
            await axios.get(
                'http://localhost:8888/api/weather/hourly'
            )
            .then(response => {
                if (response.data.Code === "ServiceUnavailable"){
                    setHourly(response.data)
                } else if (response.data.Code === "Unauthorized"){
                    setHourly(response.data)
                } else {
                    setHourly(response.data.map(item => item))
                }
            })
        }
        const fetchDaily = async () => {
            await axios.get(
                'http://localhost:8888/api/weather/daily'
            )
            .then(response => {
                if (response.data.Code === "ServiceUnavailable"){
                    setDaily(response.data)
                } else if (response.data.Code === "Unauthorized"){
                    setDaily(response.data)
                } else {
                    setDaily(response.data.DailyForecasts.map(item => item))
                }
            })
        }
        fetchHourly()
        fetchDaily()
    }, [])
    // Daily forecast, array of objects:
    /*[
        {
            DateTime: "2019-06-24T11:00:00+03:00",
            EpochDateTime: 1561363200,
            WeatherIcon: 1,
            IconPhrase: "Sunny",
            HasPrecipitation: false,
            IsDayLight: true,
            Temperature: {
                Value: 17.8,
                Unit: "C",
                UnitType: 17
            },
            PrecipitationProbability: 0,
            MobileLink: "http://m.accuweather.com/...."
            Link: "http://www.accuweather.com/...."
        },
        {
            DateTime: "2019-06-24T12:00:00+03:00",
            EpochDateTime: 1561366800,
            WeatherIcon: 1,
            IconPhrase: "Sunny",
            HasPrecipitation: false,
            IsDaylight: true,
            Temperature: {
                Value: 18.4,
                Unit: "C",
                UnitType: 17
            },
            PrecipitationProbability: 0,
            MobileLink: "http://m.accuweather.com/en/fi/tampere/134771/hourly-weather-forecast/134771?day=1&hbhhour=12&unit=c&lang=en-us",
            Link: "http://www.accuweather.com/en/fi/tampere/134771/hourly-weather-forecast/134771?day=1&hbhhour=12&unit=c&lang=en-us"
        },
        {
            DateTime: "2019-06-24T13:00:00+03:00",
            EpochDateTime: 1561370400,
            WeatherIcon: 2,
            IconPhrase: "Mostly sunny",
            HasPrecipitation: false,
            IsDaylight: true,
            Temperature: {
                Value: 19,
                Unit: "C",
                UnitType: 17
            },
            PrecipitationProbability: 0,
            MobileLink: "http://m.accuweather.com/en/fi/tampere/134771/hourly-weather-forecast/134771?day=1&hbhhour=13&unit=c&lang=en-us",
            Link: "http://www.accuweather.com/en/fi/tampere/134771/hourly-weather-forecast/134771?day=1&hbhhour=13&unit=c&lang=en-us"
        },
        {
            DateTime: "2019-06-24T14:00:00+03:00",
            EpochDateTime: 1561374000,
            WeatherIcon: 3,
            IconPhrase: "Partly sunny",
            HasPrecipitation: false,
            IsDaylight: true,
            Temperature: {
                Value: 19.4,
                Unit: "C",
                UnitType: 17
            },
            PrecipitationProbability: 0,
            MobileLink: "http://m.accuweather.com/en/fi/tampere/134771/hourly-weather-forecast/134771?day=1&hbhhour=14&unit=c&lang=en-us",
            Link: "http://www.accuweather.com/en/fi/tampere/134771/hourly-weather-forecast/134771?day=1&hbhhour=14&unit=c&lang=en-us"
        },
    ]*/
    const classes = useStyles();
    // Check state and return accordingly
    if (daily && hourly) {
        if (daily.Code === "ServiceUnavailable" || hourly.Code === "ServiceUnavailable") {
            return (
                <div>
                    Weather unavailable: {daily.Message || hourly.Message}
                </div>
            )
        } else if (daily.Code === "Unauthorized" || hourly.code === "Unauthorized") {
            return (
                <div>
                    Weather error: {daily.Message || hourly.Message}
                </div>
            )
        }else {
            return (
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                AccuWeather
                            </TableRow>
                        </TableHead>
                            <Hourly hourly={hourly}/>
                            <Daily daily={daily}/>
                    </Table>
                </Paper>
                
            )
        }
    }  else {
        return 'Loading forecast'
    }
}

export default Forecast
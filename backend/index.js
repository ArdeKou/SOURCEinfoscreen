require('dotenv').config() // Create .env file containing process.env variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const Parser = require('rss-parser')

const app = express();
app.use(cors());
app.use(bodyParser.json());

let parser = new Parser() // RSS feed parser for news tab

//env variables
// Tre APU, bus schedule
const treuser = process.env.TREUSER
const trepass = process.env.TREPASS
// Accuweather
const acckey = process.env.ACCKEY
const citykey = process.env.CITYKEY

const baseUrl = `http://api.publictransport.tampere.fi/prod/?user=${treuser}&pass=${trepass}&`
const stopsUrl = 'request=stops_area&center_coordinate=3330260,6825862&diameter=400' //coords TAMK, system kkj
const stopUrl = 'request=stop&code='

// Get stops near TAMK
app.get('/api/stops', (req, res) => { 
    console.log('getStops')
    fetch(baseUrl + stopsUrl)
        .then(res => res.json())
        .then(json => res.send(json))
})

// Get single stop by code
app.get('/api/stops/:code', (req, res) => {
    console.log('getStop', req.params.code)
    const code = req.params.code
    fetch(baseUrl + stopUrl + code)
        .then(res => res.json())
        .then(json => res.send(json))
})

// Get upcoming events from sourcery.rocks
app.get('/api/events', (req, res) => {
    console.log('getEvents')
    fetch('http://www.sourcery.rocks/wp-json/tribe/events/v1/events')
        .then(res => res.json())
        .then(json => res.send(json))
})

// RSS feed parse
app.get('/api/news', (req, res) => {
    (async () => {
        let feed = await parser.parseURL('https://feeds.yle.fi/uutiset/v1/majorHeadlines/YLE_UUTISET.rss')
        // let feed = await parser.parseURL('https://www.theonion.com/rss')
        console.log(feed.title)
        res.send(feed)
    })()
    
})

// weather API Tempere
// Weather Hourly today
app.get('/api/weather/hourly', (req, res) => {
    console.log('hourly Weather')
    fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${citykey}?metric=true&apikey=${acckey}`)
        .then(res => res.json())
        .then(json => res.send(json))
})

// Hourly local
// Hardcoded debug data
app.get('/api/weather/hourly/local', (req, res) => {
    console.log('hourly local')
    const hourly = 
    [
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
            MobileLink: "http://m.accuweather.com/en/fi/tampere/134771/hourly-weather-forecast/134771?day=1&hbhhour=11&unit=c&lang=en-us",
            Link: "http://www.accuweather.com/en/fi/tampere/134771/hourly-weather-forecast/134771?day=1&hbhhour=11&unit=c&lang=en-us"
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
    ]
    res.send(hourly)
})

// Weather daily this week
app.get('/api/weather/daily', (req, res) => {
    console.log('daily weather')
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${citykey}?apikey=${acckey}`)
        .then(res => res.json())
        .then(json => res.send(json))
})

// Local daily weather
// Hardcoded debug data
app.get('/api/weather/daily/local', (req, res) => {
    console.log('local daily weather')
    const daily = 
    {
        Headline: {
        EffectiveDate: "2019-06-26T14:00:00+03:00",
        EffectiveEpochDate: 1561546800,
        Severity: 3,
        Text: "Expect rainy weather Wednesday afternoon through late Wednesday night",
        Category: "rain",
        EndDate: "2019-06-27T08:00:00+03:00",
        EndEpochDate: 1561611600,
        MobileLink: "http://m.accuweather.com/en/fi/tampere/134771/extended-weather-forecast/134771?unit=c&lang=en-us",
        Link: "http://www.accuweather.com/en/fi/tampere/134771/daily-weather-forecast/134771?unit=c&lang=en-us"
    },
    DailyForecasts: [
        {
            Date: "2019-06-24T07:00:00+03:00",
            EpochDate: 1561348800,
            Temperature: {
                Minimum: {
                    Value: 9.5,
                    Unit: "C",
                    UnitType: 17
                },
                Maximum: {
                    Value: 19.9,
                    Unit: "C",
                    UnitType: 17
                }
            },
            Day: {
                Icon: 6,
                IconPhrase: "Mostly cloudy",
                HasPrecipitation: false
            },
            Night: {
                Icon: 35,
                IconPhrase: "Partly cloudy",
                HasPrecipitation: false
            },
            Sources: [
                "AccuWeather"
            ],
            MobileLink: "http://m.accuweather.com/en/fi/tampere/134771/daily-weather-forecast/134771?day=1&unit=c&lang=en-us",
            Link: "http://www.accuweather.com/en/fi/tampere/134771/daily-weather-forecast/134771?day=1&unit=c&lang=en-us"
        },
        {
            Date: "2019-06-25T07:00:00+03:00",
            EpochDate: 1561435200,
            Temperature: {
                Minimum: {
                    Value: 10.6,
                    Unit: "C",
                    UnitType: 17
                },
                Maximum: {
                    Value: 19.5,
                    Unit: "C",
                    UnitType: 17
                }
            },
            Day: {
                Icon: 6,
                IconPhrase: "Mostly cloudy",
                HasPrecipitation: false
            },
            Night: {
                Icon: 34,
                IconPhrase: "Mostly clear",
                HasPrecipitation: false
            },
            Sources: [
                "AccuWeather"
            ],
            MobileLink: "http://m.accuweather.com/en/fi/tampere/134771/daily-weather-forecast/134771?day=2&unit=c&lang=en-us",
            Link: "http://www.accuweather.com/en/fi/tampere/134771/daily-weather-forecast/134771?day=2&unit=c&lang=en-us"
        },
        {
            Date: "2019-06-26T07:00:00+03:00",
            EpochDate: 1561521600,
            Temperature: {
                Minimum: {
                    Value: 9.4,
                    Unit: "C",
                    UnitType: 17
                },
                Maximum: {
                    Value: 15.2,
                    Unit: "C",
                    UnitType: 17
                }
            },
            Day: {
                Icon: 12,
                IconPhrase: "Showers",
                HasPrecipitation: true,
                PrecipitationType: "Rain",
                PrecipitationIntensity: "Light"
            },
            Night: {
                Icon: 18,
                IconPhrase: "Rain",
                HasPrecipitation: true,
                PrecipitationType: "Rain",
                PrecipitationIntensity: "Moderate"
            },
            Sources: [
                "AccuWeather"
            ],
            MobileLink: "http://m.accuweather.com/en/fi/tampere/134771/daily-weather-forecast/134771?day=3&unit=c&lang=en-us",
            Link: "http://www.accuweather.com/en/fi/tampere/134771/daily-weather-forecast/134771?day=3&unit=c&lang=en-us"
        },
        {
            Date: "2019-06-27T07:00:00+03:00",
            EpochDate: 1561608000,
            Temperature: {
                    Minimum: {
                    Value: 8.4,
                    Unit: "C",
                    UnitType: 17
                },
                Maximum: {
                    Value: 18.3,
                    Unit: "C",
                    UnitType: 17
                }
            },
            Day: {
                Icon: 6,
                IconPhrase: "Mostly cloudy",
                HasPrecipitation: true,
                PrecipitationType: "Rain",
                PrecipitationIntensity: "Light"
            },
            Night: {
                Icon: 33,
                IconPhrase: "Clear",
                HasPrecipitation: false
            },
            Sources: [
                "AccuWeather"
            ],
            MobileLink: "http://m.accuweather.com/en/fi/tampere/134771/daily-weather-forecast/134771?day=4&unit=c&lang=en-us",
            Link: "http://www.accuweather.com/en/fi/tampere/134771/daily-weather-forecast/134771?day=4&unit=c&lang=en-us"
        },
        {
            Date: "2019-06-28T07:00:00+03:00",
            EpochDate: 1561694400,
            Temperature: {
                Minimum: {
                    Value: 6.1,
                    Unit: "C",
                    UnitType: 17
                },
                Maximum: {
                    Value: 16.6,
                    Unit: "C",
                    UnitType: 17
                }
            },
            Day: {
                Icon: 6,
                IconPhrase: "Mostly cloudy",
                HasPrecipitation: false
            },
            Night: {
                Icon: 35,
                IconPhrase: "Partly cloudy",
                HasPrecipitation: false
            },
            Sources: [
                "AccuWeather"
            ],
            MobileLink: "http://m.accuweather.com/en/fi/tampere/134771/daily-weather-forecast/134771?day=5&unit=c&lang=en-us",
            Link: "http://www.accuweather.com/en/fi/tampere/134771/daily-weather-forecast/134771?day=5&unit=c&lang=en-us"
        }
        ]
    }
    res.send(daily)
})

const PORT =process.env.BACKEND_PORT || 8888;
console.log('Server running on port', PORT)
app.listen(PORT);

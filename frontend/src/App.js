import React from 'react'
import Header from './components/Header'
import Bus from './components/Bus'
import Newsfeed from './components/Newsfeed'
import Calendar from './components/Calendar'
import Forecast from './components/Forecast'

const App = () => {
    // Render
    return (
        <div className='app'>
            <Header />
            <div className='baseContainer'>
                
                <Bus />
                <Calendar />
                <Newsfeed className='newsContainer' />
                <Forecast className='forecastContainer' />
            </div>
        </div>
    )

}

export default App
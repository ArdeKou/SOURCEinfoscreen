import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
//import WithTheme from '../themes/WithTheme'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
})

/*function DarkTheme() {
    return (
        <ThemeProvider theme={theme}>
            <WithTheme />
        </ThemeProvider>
    )
}*/

// -----------------------------------------------------//
//    Infoscreen application for Source Ry Clubroom     //
//                                                      //
//    Contributors:                                     //
//    Pietari Noeskoski                                 //
//    Artturi Koutonen                                  //
//    Toni Hytönen                                      //
//                                                      //
//    MIT License Copyright (c) 2019 IOvirta            //
// -----------------------------------------------------//

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>, 
    document.getElementById('root')
    )
    


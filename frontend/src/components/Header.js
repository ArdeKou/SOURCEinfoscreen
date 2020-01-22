import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

const useStyles= makeStyles({
    root: {
        flexGrow: 1,
    },
})



// Header
// TODO: add logo

const Header = () => {
    const classes = useStyles();
        return (
           <div className = {classes.root}>
               <AppBar position="static" color="default">
                   <Toolbar>
                       <Typography variant="h2" color="inherit">
                           Welcome to Source ry clubroom
                       </Typography>
                   </Toolbar>
               </AppBar>
           </div>
        )
}
    


export default Header
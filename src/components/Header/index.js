import React from 'react'

import makeStyles from '@material-ui/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Tooltip  from '@material-ui/core/Tooltip'
import AppBar  from '@material-ui/core/AppBar'
import Toolbar  from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'

import logoLight from '../../assets/img/ifpb_light.png'
import logoDark from '../../assets/img/ifpb_dark.png'

const useStyles = makeStyles((theme) => {
    return {
        AppBar: {
            display: 'flex',
            backgroundColor: theme.palette.background.default, 
        },
        img: {
            margin: theme.spacing(2), 
            width: theme.spacing(5)
        }, 
        date: {
            flexGrow: 1, 
            marginLeft: theme.spacing(2)
        },
        avatar: {
            margin: theme.spacing(2), 
        }, 
        
        toolbar: theme.mixins.toolbar, 
    }
})



export default function Header( {paletteType, setPaletteType} ) {
    
    const classes = useStyles(); 

    return (
        <AppBar className={classes.AppBar} elevation={1} >
            <Toolbar>
                <img src={paletteType? logoLight : logoDark } className={classes.img} alt='logo'/>
                <Typography variant='h6' color='textSecondary'className={classes.date}>
                    Grade Curricular
                    <span> 
                        <Typography > Engenharia de Computação </Typography>
                    </span>
                </Typography>  

                
                <Tooltip title={!paletteType? 'Tema claro' : 'Tema escuro' } >
                    <IconButton onClick={() => setPaletteType(!paletteType)} >
                        { paletteType?  <Brightness4Icon /> : <Brightness7Icon /> }
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    )
}

import React from 'react'

import makeStyles from '@material-ui/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Tooltip  from '@material-ui/core/Tooltip'
import AppBar  from '@material-ui/core/AppBar'
import Toolbar  from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'

import { ReactComponent as LogoLight } from '../../assets/logo.svg'


const useStyles = makeStyles((theme) => {
    return {
        AppBar: {
            display: 'flex',
            backgroundColor: theme.palette.background.default, 
            paddingTop: 8,
            paddingBottom: 8,
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

        links: {
            margin: theme.spacing(1,1)
        }
    }
})



export default function Header( {paletteType, setPaletteType, title} ) {
    
    const classes = useStyles(); 

    return (
        <AppBar className={classes.AppBar} elevation={2} >
            <Toolbar>
                <LogoLight />
                <Typography variant='h6' color='textSecondary' className={classes.date} >
                    Matriz Dinâmica <br/>
                    <Typography variant='body2' >
                        IFPB Campina Grande
                    </Typography>
                </Typography>  
                <Typography 
                    className={classes.date} 
                    variant='overline' 
                    color='textSecondary'
                > {title} </Typography>
                <Link className={classes.links} href='/courses' > Cursos </Link>    
                <Link className={classes.links} href='/docs' > Documentação </Link>
                <Link className={classes.links} href='/about' > Sobre </Link>
                
                <Tooltip title={!paletteType? 'Tema claro' : 'Tema escuro' } >
                    <IconButton onClick={() => setPaletteType(!paletteType)} color='primary' >
                        { paletteType?  <Brightness4Icon /> : <Brightness7Icon /> }
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    )
}

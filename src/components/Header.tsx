import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuBookIcon from '@material-ui/icons/MenuBook';
// eslint-disable-next-line
import React from 'react';
import SearchField from './SearchField';

const useStyles = makeStyles({
    header: {
        height: '500px',
        width: '100vw',
        overflow: 'hidden',
        background:
            "-webkit-linear-gradient(rgba(89,29,169, 0.8), rgba(5,25,96, 0.8)), url('/BookShelf.jpg')",
        backgroundSize: 'cover'
    },
    backgroundImg: {
        width: '100vw',
        opacity: '0.4'
    },
    title: {
        color: '#f1d4d4',
        fontSize: '3em',
        fontFamily: 'Pacifico, cursive'
    },
    icon: {
        fontSize: 70,
        color: '#f1d4d4'
    }
});

const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid
            direction="column"
            justify="center"
            alignItems="center"
            container
            className={classes.header}
        >
            <Grid item>
                <MenuBookIcon className={classes.icon} />
            </Grid>
            <Grid item>
                <h1 className={classes.title}>What to read next.. ?</h1>
            </Grid>
            <Grid item>
                <SearchField />
            </Grid>
        </Grid>
    );
};

export default Header;

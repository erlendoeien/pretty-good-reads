import { Grid, Tab } from '@material-ui/core';
// eslint-disable-next-line
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
    classes: Record<string, string>;
}

const GuestNavItem: FC<IProps> = ({ classes }) => {
    return (
        <Grid container item justify="flex-end" alignItems="center" spacing={0}>
            <NavLink to="/login" className={classes.link} activeClassName={`${classes.activeLink}`}>
                <Tab label="Login" />
            </NavLink>
            <NavLink
                to="/register"
                className={classes.link}
                activeClassName={`${classes.activeLink}`}
            >
                <Tab label="Register" />
            </NavLink>
        </Grid>
    );
};

export default GuestNavItem;

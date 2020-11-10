import { Grid } from '@material-ui/core';
// eslint-disable-next-line
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import MenuBookIcon from '@material-ui/icons/MenuBook';

interface IProps {
    classes: Record<string, string>;
}

const HomeNavItem: FC<IProps> = ({ classes }) => {
    return (
        <Grid item>
            <NavLink to="/" exact activeClassName={`${classes.activeLink}`}>
                <MenuBookIcon className={classes.icon} />
            </NavLink>
        </Grid>
    );
};

export default HomeNavItem;

import { Button, Grid, Tab } from '@material-ui/core';
// eslint-disable-next-line
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { RegularUserFragment } from '../../generated/graphql';

interface IProps {
    classes: Record<string, string>;
    user: RegularUserFragment;
    handleLogout: (_: React.MouseEvent) => Promise<void>;
}

const LoggedInNavItem: FC<IProps> = ({ classes, user, handleLogout }) => {
    return (
        <Grid container item justify="flex-end" alignItems="center">
            <NavLink
                to="/profile"
                className={classes.link}
                activeClassName={`${classes.activeLink}`}
            >
                <Tab label={user.firstName} />
            </NavLink>
            <Button variant="outlined" size="small" onClick={handleLogout}>
                Logout
            </Button>
        </Grid>
    );
};

export default LoggedInNavItem;

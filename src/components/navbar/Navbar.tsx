// eslint-disable-next-line
import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import GuestNavItem from './GuestNavItem';
import LoggedInNavItem from './LoggedInNavItem';
import HomeNavItem from './HomeNavItem';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        paddingLeft: '20px',
        paddingRight: '40px'
    },
    icon: {
        fontSize: 35,
        color: 'rgba(89,29,169)',
        marginLeft: '10px'
    },
    link: {
        textDecoration: 'none',
        color: 'black'
    },
    activeLink: {
        '&  > *': {
            fontWeight: 'bolder'
        }
    }
});

interface IProps {
    default?: boolean;
}

const Navbar: FC<IProps> = (props) => {
    const classes = useStyles();
    const { data, loading } = useMeQuery({ fetchPolicy: 'cache-and-network' });
    const [logoutMutation, { client }] = useLogoutMutation({
        // Clear store for user related queryies instead of invalidating me-query
        onCompleted() {
            client.clearStore().then(() => client.resetStore());
        }
    });
    /**
     * Logs out the user, triggers the clearStore
     */
    const handleLogout = async (_: React.MouseEvent) => {
        await logoutMutation();
    };

    // Default navbar
    if (props.default)
        return (
            <Paper className={classes.root}>
                <Grid
                    container
                    alignItems="center"
                    justify="space-between"
                    direction="row"
                    wrap="nowrap"
                >
                    <HomeNavItem classes={classes} />
                </Grid>
            </Paper>
        );

    return (
        <Paper className={classes.root}>
            <Grid
                container
                alignItems="center"
                justify="space-between"
                direction="row"
                wrap="nowrap"
            >
                <HomeNavItem classes={classes} />
                {/* Render user status */}
                {!loading && data?.me ? (
                    <LoggedInNavItem user={data.me} handleLogout={handleLogout} classes={classes} />
                ) : (
                    <GuestNavItem classes={classes} />
                )}
            </Grid>
        </Paper>
    );
};

Navbar.defaultProps = {
    default: false
};
export default Navbar;

// eslint-disable-next-line
import React, { FC, ReactNode } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useMeQuery } from '../../generated/graphql';

interface RoutePropsWithChildren extends RouteProps {
    children: ReactNode;
}

/**
 * Redirects to the frontpage if the user isn't authenticated
 */
const PrivateRoute: FC<RoutePropsWithChildren> = ({ children, ...rest }) => {
    const { data } = useMeQuery();
    console.log('Is not authenticated, redirect');

    return (
        <Route
            {...rest}
            render={() =>
                data?.me ? (
                    children
                ) : (
                    <Redirect
                        exact
                        to={{
                            pathname: '/'
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;

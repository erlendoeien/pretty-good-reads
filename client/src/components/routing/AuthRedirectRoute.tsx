// eslint-disable-next-line
import React, { FC, ReactNode } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useMeQuery } from '../../generated/graphql';

interface IProps extends RouteProps {
    children: ReactNode;
}

/**
 * Redirects to the frontpage if the user is authenticated
 */
const AuthRedirectRoute: FC<IProps> = ({ children, ...rest }) => {
    const { data, loading, error } = useMeQuery();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                !(error || loading || data?.me) ? (
                    children
                ) : (
                    <Redirect
                        exact
                        to={{
                            pathname: '/',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default AuthRedirectRoute;

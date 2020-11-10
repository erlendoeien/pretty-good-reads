// eslint-disable-next-line
import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ProfilePage from 'src/views/ProfilePage';
import BookPage from '../../views/BookPage';
import HomePage from '../../views/HomePage';
import LoginPage from '../../views/LoginPage';
import RegisterPage from '../../views/RegisterPage';
import AuthRedirectRoute from './AuthRedirectRoute';
import PrivateRoute from './PrivateRoute';
import Header from '../Header';
import Navbar from '../navbar/Navbar';

/**
 * Switch to dynamically render navbar
 * as well as the router switch
 */
const MainRouterSwitch = () => {
    // Render different navbar when on login/register
    const match = useRouteMatch('/:path(register|login)');

    return (
        <>
            <Navbar default={match ? match.isExact : false} />
            <Switch>
                <AuthRedirectRoute path="/login">
                    <LoginPage />
                </AuthRedirectRoute>
                <AuthRedirectRoute path="/register">
                    <RegisterPage />
                </AuthRedirectRoute>
                <Route exact path="/">
                    <Header />
                    <HomePage />
                </Route>
                <PrivateRoute path="/profile">
                    <ProfilePage />
                </PrivateRoute>
                <Route path="/:id">
                    <BookPage />
                </Route>
            </Switch>
        </>
    );
};

export default MainRouterSwitch;

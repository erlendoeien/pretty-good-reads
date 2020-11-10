// eslint-disable-next-line
import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouterSwitch from './components/routing/MainRouterSwitch';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <MainRouterSwitch />
            </div>
        </Router>
    );
};

export default App;

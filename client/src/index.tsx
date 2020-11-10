// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import App from './App';
import { client } from './cache';
import BookStore, { BookStoreContext } from './components/stores/BookStore';

// Might fix some issues with mui elements - Fixes in mui v5
// REF: https://material-ui.com/customization/theming/#unstable-createmuistrictmodetheme-options-args-theme
const theme = unstable_createMuiStrictModeTheme();

ReactDOM.render(
    <React.StrictMode>
        <BookStoreContext.Provider value={new BookStore()}>
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </ApolloProvider>
        </BookStoreContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

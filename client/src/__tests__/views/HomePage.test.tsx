import React from 'react';
import { render, act, cleanup } from '@testing-library/react';
import {
    ApolloLoadingProvider,
    ApolloErrorProvider,
    ApolloMockedProvider
} from '../../test-utils/providers';
import HomePage from 'src/views/HomePage';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(cleanup);

//test loading state
test('HomePage loading', async () => {
    const { debug, getByTestId } = render(
        <ApolloLoadingProvider>
            <HomePage />
        </ApolloLoadingProvider>
    );

    expect(getByTestId('loading')).toBeInTheDocument();
    debug(); //print the document tree to the test log
});

//test error state
test('HomePage error', async () => {
    const { debug, getByTestId } = render(
        <ApolloErrorProvider graphQLErrors={[]}>
            <HomePage />
        </ApolloErrorProvider>
    );

    await act(async () => {
        Promise.resolve(); //wait for the loading to finish
    });
    expect(getByTestId('error')).toBeInTheDocument();
    debug(); //write the document tree to the test log
});

//test data
test('HomePage rendering data', async () => {
    const { debug } = render(
        <ApolloMockedProvider
            customResolvers={{
                Query: () => ({
                    books: () => [
                        {
                            limit: 2,
                            offset: 0,
                            sort: [{ sortField: 'goodreadsRatings', sortValue: 'DESC' }]
                        }
                    ]
                })
            }}
        >
            <Router>
                <HomePage />
            </Router>
        </ApolloMockedProvider>
    );

    await act(async () => {
        await Promise.resolve(); //wait for loading to finish
    });
    expect(document.querySelector('.MuiGrid-container')).toBeInTheDocument();

    debug(); //write the document tre to the test log
});

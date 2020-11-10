// eslint-disable-next-line
import React, { useContext, useEffect, useState } from 'react';
import { IconButton, makeStyles, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useReactiveVar } from '@apollo/client';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { BookStoreContext } from './stores/BookStore';
import { filterVar, limitVar, offsetVar, searchValueVar, sortVar } from '../cache';
import { sleep } from '../utils/sleep';

const useStyles = makeStyles({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        margin: '0 5% 0 5%',
        width: '100%'
    },
    input: {
        marginLeft: '8px',
        flex: 1
    },
    iconButton: {
        padding: 10
    }
});

const SearchField: React.FC = observer(() => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');

    const searchValue = useReactiveVar(searchValueVar);
    const limit = useReactiveVar(limitVar);
    const offset = useReactiveVar(offsetVar);
    const filter = useReactiveVar(filterVar);
    const sort = useReactiveVar(sortVar);

    const bookStore = useContext(BookStoreContext);

    // Creates dependency on order when using in it hasch
    const variables = {
        searchQuery: searchValue,
        limit,
        offset,
        filter,
        sort
    };

    // Debounce type-search-update, clean up if unmounted before debounce hit
    useEffect(() => {
        const timeoutId = setTimeout(() => searchValueVar(inputValue), 500);
        return () => clearTimeout(timeoutId);
    }, [inputValue]);

    /**
     * Fetch new books based on new search from mobx store
     */
    useEffect(() => {
        const fetchData = async () => {
            if (searchValue) {
                // Add data to state For autocomplete
                await sleep(300).then(() => toJS(bookStore.fetchBooks(variables)));
            }
        };
        fetchData();
    }, [searchValue, variables, bookStore]);

    function handleSearch(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        searchValueVar(inputValue);
    }

    return (
        <Paper component="form" className={classes.root}>
            <input
                placeholder={searchValue}
                data-cy="input"
                style={{ width: '500px', height: '40px' }}
                className={classes.input}
                type="search"
                onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setInputValue(event.target.value)
                }
            />
            <IconButton
                type="submit"
                onClick={handleSearch}
                className={classes.iconButton}
                aria-label="search"
                data-cy="submit"
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
});

export default SearchField;

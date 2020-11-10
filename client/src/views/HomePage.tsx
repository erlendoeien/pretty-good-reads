import { useReactiveVar } from '@apollo/client';
import { Box, Container, Grid, Theme, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
// eslint-disable-next-line
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookItem from 'src/components/BookItem';
import { observer } from 'mobx-react-lite';
import { offsetVar, limitVar, sortVar, searchValueVar, filterVar } from '../cache';
import Paginator from '../components/Paginator';
import OptionsBar from '../components/resultoptions/OptionsBar';
import StyledSpinner from '../components/StyledSpinner';
import { BookDocument, BookQuery, useBooksQuery } from '../generated/graphql';
import placeholder from '../images/placeholder.png';
import { BookStoreContext } from '../components/stores/BookStore';

const useStyles = makeStyles((_: Theme) => ({
    root: {
        marginTop: '4vh',
        marginBottom: '4vh'
    },
    link: {
        textDecoration: 'none',
        color: 'black'
    },
    bookItem: {
        marginBottom: '10px'
    }
}));

const HomePage: React.FC = observer(() => {
    const classes = useStyles();

    const bookStore = useContext(BookStoreContext);

    // Fetch cached reactive vars
    const offset = useReactiveVar(offsetVar);
    const limit = useReactiveVar(limitVar);
    const sort = useReactiveVar(sortVar);
    const filter = useReactiveVar(filterVar);
    const searchValue = useReactiveVar(searchValueVar);
    // const [filters, setFilters] = useState([]);

    const variables = {
        searchQuery: searchValue,
        limit,
        offset,
        filter,
        sort
    };

    const { data, loading, error, client } = useBooksQuery({
        variables: {
            options: {
                ...variables
            }
        },
        fetchPolicy: 'cache-and-network',
        // Save to cache

        onCompleted(data) {
            client.writeQuery<BookQuery>({
                query: BookDocument,
                data,
                variables: {
                    options: variables
                }
            });
        }
    });

    /**
     * Reset offset whenever the query variables changes, except offset
     * Should be in custom hook, causes unmounted errors
     */
    useEffect(() => {
        offsetVar(0);
    }, [limit, sort, searchValue]);

    /**
     * Save books to mobx store to be accessed by autocomplete
     * Could be used for caching too, but Apollo is cleaner
     * Only cache when the searchValue is set
     */
    useEffect(() => {
        let timeoutId: number | undefined;
        if (data?.books.books && searchValue) {
            timeoutId = bookStore.addNewBooks(data.books.books, variables);
        } else {
            timeoutId = undefined;
        }
        return () => clearTimeout(timeoutId);
    }, [data]);

    const renderBooks = () => {
        if (data?.books.books)
            return data.books.books.map((book) => {
                return (
                    <Grid item xs={2} key={`bookGridItem_${book.id}`} className={classes.bookItem}>
                        <Link className={classes.link} to={`/${book.id}`}>
                            <BookItem
                                coverImg={book.bookCoverUrl || placeholder}
                                title={book.title}
                            />
                        </Link>
                    </Grid>
                );
            });
        return null;
    };

    // error
    if (!loading && !data) {
        return (
            <div data-testid="error">
                <div>Sorry, we could not display the books right now</div>
                <div>{error?.message}</div>
            </div>
        );
    }

    // No match on books
    if ((!loading && !data?.books?.books) || data?.books?.books?.length === 0) {
        return (
            <Box mt="15vh" fontStyle="italic" textAlign="center">
                <Typography variant="h3" color="textPrimary" gutterBottom>
                    Sorry, there are no books which matches your criteria
                </Typography>
                <Typography variant="h4" color="textSecondary">
                    Did you mean 'J.K. Rowling'?
                </Typography>
            </Box>
        );
    }

    return (
        <Container className={classes.root}>
            {!data && loading ? (
                <div>
                    <StyledSpinner />
                    <div>Loading...</div>
                    <div data-testid="loading">Loading...</div>
                </div>
            ) : (
                <>
                    <OptionsBar />
                    <Grid container alignItems="center">
                        {renderBooks()}
                    </Grid>
                    <Paginator totalCount={data?.books.totalCount || 0} />
                </>
            )}
        </Container>
    );
});

export default HomePage;

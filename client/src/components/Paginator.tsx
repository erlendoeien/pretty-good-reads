import { useReactiveVar } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination/Pagination';
// eslint-disable-next-line
import React from 'react';
import { offsetVar, limitVar } from '../cache';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
            justifyContent: 'center',
            display: 'flex'
        }
    }
}));

/**
 * Paginator bar, almost independent by reactive variables limit and offset
 */
export default function Paginator({ totalCount }: { totalCount: number }) {
    const offset = useReactiveVar(offsetVar);
    const limit = useReactiveVar(limitVar);
    const classes = useStyles();

    /*
     * Updates the reactive offset to the new value
     */
    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
        offsetVar((newPage - 1) * limit);
    };

    // No books to paginate
    if (totalCount === 0) return null;

    return (
        <Pagination
            className={classes.root}
            page={offset / limit + 1}
            count={Math.ceil(totalCount / limit)}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
        />
    );
}

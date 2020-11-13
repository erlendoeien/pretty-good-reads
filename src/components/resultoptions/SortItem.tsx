import { useReactiveVar } from '@apollo/client';
import { Box, createStyles, IconButton, makeStyles, MenuItem, Theme } from '@material-ui/core';
// eslint-disable-next-line
import React, { FC } from 'react';
import TextRotationDownIcon from '@material-ui/icons/TextRotationDown';
import TextRotateUpIcon from '@material-ui/icons/TextRotateUp';
import { sortVar } from '../../cache';
import { ValidSortSelectField } from '../types';
import StyledSelect from '../inputComponents/StyledSelect';

interface SortItemProps {
    order: number;
}

const VALID_SORT_FIELDS: ValidSortSelectField[] = [
    'numPages',
    'title',
    'publicationDate',
    'languageCode',
    'goodreadsRatings'
];

const createUserFriendlyOptions = (fields: ValidSortSelectField[]) => {
    return fields.map((field) => {
        switch (field) {
            case 'numPages':
                return 'Pages';
            case 'goodreadsRatings':
                return 'Popularity';
            case 'languageCode':
                return 'Language';
            case 'title':
                return 'Title';
            case 'publicationDate':
                return 'Publication date';
            default:
                return null;
        }
    });
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sortElement: {
            marginLeft: theme.spacing(0),
            marginRight: theme.spacing(0)
        },
        orderButton: {
            marginTop: theme.spacing(2)
        }
    })
);

/**
 * Possible memory leak because tries to apply state
 * before mounted.https://github.com/apollographql/apollo-client/issues/6209
 * @param param0 Order
 */
const SortItem: FC<SortItemProps> = ({ order }) => {
    const classes = useStyles();
    const sort = useReactiveVar(sortVar);

    // TODO: Update when generated sort hook
    // useEffect(() => {
    //     sort = useReactiveVar(sortVar);
    // }, []);

    /**
     * Renders/creates sorting options for select
     */
    const createSortOptions = () => {
        const existingSortFields = sort.map(({ sortField }) => sortField);
        const userFriendlyOptions = createUserFriendlyOptions(VALID_SORT_FIELDS);
        return VALID_SORT_FIELDS.map((field, index) => {
            if (field === null) {
                console.log('Invalid sort field ');
                return null;
            }
            let disabled = false;

            // Disable already sorted on fields
            if (existingSortFields.includes(field)) {
                disabled = true;
            }
            return (
                <MenuItem key={`sort_field_${field}_${order}`} disabled={disabled} value={field}>
                    {userFriendlyOptions[index]}
                </MenuItem>
            );
        });
    };

    /**
     * Iterates through, the order is given by the cache
     * Atm. only handle single sort
     * @param event When changing on the select
     */
    const handleFieldChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newField = event.target.value as string;
        sortVar([{ sortField: newField, sortValue: 'ASC' }]);
    };

    const handleValueChange = (e: React.MouseEvent) => {
        e.preventDefault();
        if (sort[order].sortValue === 'ASC')
            return sortVar([{ ...sort[order], sortValue: 'DESC' }]);
        return sortVar([{ ...sort[0], sortValue: 'ASC' }]);
    };

    return (
        <Box display="flex" alignItems="center">
            <StyledSelect
                addedClass={classes.sortElement}
                id="sort-select"
                value={sort[order].sortField}
                handleChange={handleFieldChange}
                inputLabel="Sort by"
            >
                {createSortOptions()}
            </StyledSelect>
            <IconButton
                className={`${classes.sortElement} ${classes.orderButton}`}
                aria-label="sort-order"
                onClick={handleValueChange}
            >
                {sort[order].sortValue === 'ASC' ? <TextRotateUpIcon /> : <TextRotationDownIcon />}
            </IconButton>
        </Box>
    );
};

export default SortItem;

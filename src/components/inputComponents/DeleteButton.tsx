import { makeStyles, Button } from '@material-ui/core';
// eslint-disable-next-line
import React, { FC } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3, 1, 2)
    }
}));

interface DeleteButtonInterface {
    onDelete: () => void;
}

const DeleteButton: FC<DeleteButtonInterface> = (props) => {
    const classes = useStyles();

    return (
        <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={props.onDelete}
        >
            Delete
        </Button>
    );
};

export default DeleteButton;

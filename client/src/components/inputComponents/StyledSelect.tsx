import {
    withStyles,
    Theme,
    createStyles,
    InputBase,
    makeStyles,
    FormControl,
    InputLabel,
    Select
} from '@material-ui/core';
// eslint-disable-next-line
import React, { FC } from 'react';

// Style used from example https://material-ui.com/components/selects/
const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            'label + &': {
                marginTop: theme.spacing(3)
            }
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"'
            ].join(','),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
            }
        }
    })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(2)
        },
        container: {
            margin: theme.spacing(2),
            display: 'flex',
            justifyContent: 'flex-end'
        }
    })
);
/**
 * Needs the value, changeHandler and the select options as children
 */
interface StyledSelectProps {
    value: number | string;
    id?: string;
    inputLabel?: string;
    handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    children: React.ReactNode;
    addedClass?: string;
}

/**
 * Returns a Bootstrap-styled input
 * @param param0 Props needed for select
 */
const StyledSelect: FC<StyledSelectProps> = ({
    id,
    value,
    handleChange,
    inputLabel,
    addedClass,
    children: options
}) => {
    const classes = useStyles();

    return (
        <FormControl className={`${classes.margin} ${addedClass || ''}`}>
            {inputLabel && <InputLabel id="select-label">{inputLabel}</InputLabel>}
            <Select
                labelId="select-label"
                id={id}
                value={value}
                onChange={handleChange}
                input={<BootstrapInput />}
            >
                {options}
            </Select>
        </FormControl>
    );
};

export default StyledSelect;

import { CircularProgress, Theme, withStyles } from '@material-ui/core';

const StyledSpinner = withStyles((_: Theme) => ({
    colorPrimary: {
        color: '#591DA9',
        opacity: 0.8
    },
    root: {
        // center
        top: `calc(50% - ${40 / 2}px)`,
        left: `calc(50% - ${40 / 2}px)`,
        position: 'absolute'
    }
}))(CircularProgress);

export default StyledSpinner;

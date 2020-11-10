import { Box } from '@material-ui/core';
// eslint-disable-next-line
import React from 'react';
import ResultsPerPage from './ResultsPerPage';
import SortItem from './SortItem';

const OptionsBar = () => {
    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            flexWrap="wrap"
        >
            {/* TODO: Hardcoded sort, not frontend support for multiple sort values */}
            <Box>
                <SortItem order={0} />
            </Box>
            <Box ml="2vw">
                <ResultsPerPage />
            </Box>
        </Box>
    );
};

export default OptionsBar;

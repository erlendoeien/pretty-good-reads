import { useReactiveVar } from '@apollo/client';
import { MenuItem } from '@material-ui/core';
// eslint-disable-next-line
import React, { FC } from 'react';
import { limitVar } from '../../cache';
import StyledSelect from '../inputComponents/StyledSelect';
import { ValidLimits } from '../types';

const ResultsPerPage: FC = () => {
    const limit = useReactiveVar(limitVar);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        console.log(event.target.value);
        if (isNaN(parseInt(event.target.value as string, 10))) throw new Error('Invalid limit');
        limitVar(parseInt(event.target.value as string, 10) as ValidLimits);
    };

    const createMenuItems = () => {
        const limits: ValidLimits[] = [10, 20, 25, 50, 100];
        return limits.map((limitValue) => (
            <MenuItem key={`limit_${limitValue}`} value={limitValue}>
                {limitValue}
            </MenuItem>
        ));
    };

    return (
        <StyledSelect
            value={limit}
            id="Results-Per-Page-select"
            inputLabel="Results"
            handleChange={handleChange}
        >
            {createMenuItems()}
        </StyledSelect>
    );
};

export default ResultsPerPage;

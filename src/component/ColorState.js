import React from 'react';
import SquareIcon from '@mui/icons-material/Square';
import styled from 'styled-components';

const ColorStateBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
`;

const ColorStateItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

export function ColorState({ states }) {
    return (
        <ColorStateBox>
            {states.map((state, index) => (
                <ColorStateItem key={index}>
                    <SquareIcon sx={{ color: state.color }} />
                    <p>{state.text}</p>
                </ColorStateItem>
            ))}
        </ColorStateBox>
    );
}

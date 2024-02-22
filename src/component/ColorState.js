import React from 'react';
import SquareIcon from '@mui/icons-material/Square';
import styled from 'styled-components';

const ColorStateBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    background-color: #ffffff;
    width: fit-content;
    padding: 0px 30px;
    border-radius: 10px;
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

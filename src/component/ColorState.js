import React from 'react';
import SquareIcon from '@mui/icons-material/Square';
import styled from 'styled-components';

const ColorStateBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    background-color: #ffffff;
    padding: 0px 30px;
    border-radius: 10px;
    margin-top: 30px;
    justify-content: space-around;

    @media screen and (max-width: 561px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0px;
    }
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

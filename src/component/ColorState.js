import React from "react";
import SquareIcon from "@mui/icons-material/Square";
import styled from "styled-components";

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

const ColorStateBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: #ffffff;
    padding: 0px 10px 0px 20px;
    border-radius: 10px;
    margin-top: 30px;

    @media screen and (max-width: 700px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0px;
        flex-wrap: wrap;
    }
`;

const ColorStateItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    width: 50%;
`;

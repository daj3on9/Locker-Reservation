import React, { useState } from 'react';
import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FirstFloor from '../asset/map_1F.png';
import SecondFloor from '../asset/map_2F.png';
import { ColorState } from './ColorState';

const MapContainer = styled.div`
    margin: 100px 0px 0px 100px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1280px) {
        margin: 30px;
        align-items: center;
    }
`;

const ImageContainer = styled.div`
    width: 33.5%;

    @media screen and (max-width: 1280px) {
        width: 80%;
    }
`;

const Image = styled.img`
    width: 100%;
`;

const FormContainer = styled.div`
    background-color: #ffffff;
    width: 33.5%
    margin-top: 50px;

    @media screen and (max-width: 1280px) {
        width: 80%;
    }
`;

const StateContainer = styled.div`
    width: 33.5%;

    @media screen and (max-width: 1280px) {
        width: 80%;
    }
`;

const Map = () => {
    const [floor, setFloor] = useState('');

    const handleChange = (event) => {
        setFloor(event.target.value);
    };

    return (
        <MapContainer>
            <ImageContainer>
                {floor === 1 && <Image src={FirstFloor} alt="1층" />}
                {floor === 2 && <Image src={SecondFloor} alt="2층" />}
            </ImageContainer>
            <FormContainer>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Floor</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={floor}
                        label="Age"
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value={1}> 1층 </MenuItem>
                        <MenuItem value={2}> 2층 </MenuItem>
                    </Select>
                </FormControl>
            </FormContainer>
            <StateContainer>
                <ColorState
                    states={[
                        { color: '#D9D9D9', text: '대여 불가능' },
                        { color: '#7ea0db', text: '대여 가능' },
                        { color: '#E26C6C', text: '선택' },
                    ]}
                />
            </StateContainer>
        </MapContainer>
    );
};

export default Map;

import React, { useState, createContext } from "react";
import Locker from "./Locker";
import { useAuthenticated, useUserName } from "../store/UseStore";
import { postReserve } from "../api/Lockers";
import { useAccessToken } from "../store/UseStore";

import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FirstFloor from "../asset/map_1F.png";
import SecondFloor from "../asset/map_2F.png";
import { ColorState } from "./ColorState";

export const MapContext = createContext({
    floor: 111, // 임의 값
    myLocker: undefined, // 초기값
    setMyLocker: () => {}, // myLocker 업데이트
});

const Map = () => {
    const [floor, setFloor] = useState(111); // 사물함 위치 변경
    const [myLocker, setMyLocker] = useState(); // myLocker 위치

    const handleChange = (event) => {
        setFloor(event.target.value);
    };

    const authenticated = useAuthenticated();
    const userName = useUserName();
    const token = useAccessToken(); // accessToken 가져오기

    // 예약 취소
    const hadleCancle = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("취소하시겠습니까?");
        if (isConfirmed && myLocker) {
            const reservation = {
                roomLocation: myLocker.roomLocation,
                row: myLocker.row,
                column: myLocker.col,
            };
            console.log(reservation);
            postReserve(token.accessToken, reservation);
        }
    };

    return (
        <MapContext.Provider value={{ floor, myLocker, setMyLocker }}>
            <div>
                {authenticated ? (
                    <UserName>{userName}님.</UserName>
                ) : (
                    <UserName> 로그인 후 예약해주세요! </UserName>
                )}

                <MapContainer>
                    <ImageContainer>
                        {floor === 111 && <Image src={FirstFloor} alt="1층" />}
                        {floor === 112 && <Image src={SecondFloor} alt="2층" />}
                    </ImageContainer>
                    <FormContainer>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Floor
                            </InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={floor}
                                label="Age"
                                onChange={handleChange}
                                fullWidth>
                                <MenuItem value={111}> 111 앞 </MenuItem>
                                <MenuItem value={112}> 112 앞 </MenuItem>
                            </Select>
                        </FormControl>
                    </FormContainer>
                    <StateContainer>
                        <ColorState
                            states={[
                                { color: "#D9D9D9", text: "대여 불가능" },
                                { color: "#7ea0db", text: "대여 가능" },
                                { color: "#E26C6C", text: "선택" },
                                { color: "#9AC586", text: "내 사물함" },
                            ]}
                        />
                    </StateContainer>
                    {authenticated && myLocker ? (
                        <CancleButton onClick={hadleCancle}>
                            예약취소
                        </CancleButton>
                    ) : (
                        <></>
                    )}
                </MapContainer>
            </div>
            <Locker />
        </MapContext.Provider>
    );
};

const MapContainer = styled.div`
    margin: 30px 0px 0px 100px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1280px) {
        margin: 30px;
        align-items: center;
    }
`;

const ImageContainer = styled.div`
    @media screen and (max-width: 1280px) {
        width: 80%;
    }
`;

const Image = styled.img`
    width: 100%;
`;

const FormContainer = styled.div`
    background-color: #ffffff;
    margin-top: 50px;

    @media screen and (max-width: 1280px) {
        width: 80%;
    }
`;

const StateContainer = styled.div`
    @media screen and (max-width: 1280px) {
        width: 80%;
    }
`;

const UserName = styled.div`
    text-align: left;
    margin-left: 100px;
    margin-top: 50px;
`;

const CancleButton = styled.button`
    margin-top: 30px;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background-color: #ffffff;
    font-size: 15px;
    cursor: pointer;

    @media screen and (max-width: 1280px) {
        width: 80%;
    }

    &:hover {
        background-color: gray;
    }
`;

export default Map;

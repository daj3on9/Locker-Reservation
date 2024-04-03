import React, { useState, createContext } from "react";
import Locker from "./Locker";
import { useAuthenticated } from "../store/UseStore";
import { deleteReserve } from "../api/Lockers";
import { useAccessToken } from "../store/UseStore";

import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ColorState } from "./ColorState";

// 지도 사진
import F115 from "../asset/115.png";
import F116 from "../asset/116.png";
import F117 from "../asset/117.png";
import F123 from "../asset/123.png";
import F124 from "../asset/124.png";
import F220 from "../asset/220.png";
import F221 from "../asset/221.png";
import F322B from "../asset/322B.png";
import F322F from "../asset/322F.png";
import F323 from "../asset/323.png";

export const MapContext = createContext({
    floor: 115, // 임의 값
    myLocker: undefined, // 초기값
    setMyLocker: () => {}, // myLocker 업데이트
    reservationStatus: undefined, // 예약 상태
    setReservationStatus: () => {}, // 예약 상태 업데이트
});

const Map = () => {
    const [floor, setFloor] = useState(115); // 사물함 위치 변경
    const [myLocker, setMyLocker] = useState(); // myLocker 위치
    const [reservationStatus, setReservationStatus] = useState(); // 예약 상태

    const handleChange = (event) => {
        setFloor(event.target.value);
    };

    const authenticated = useAuthenticated();
    const token = useAccessToken(); // accessToken 가져오기

    // 예약 취소
    const hadleCancle = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("취소하시겠습니까?");
        if (isConfirmed && myLocker) {
            await deleteReserve(token.accessToken);
            setReservationStatus("cacnelled"); // 예약 상태 업데이트
        }
    };

    return (
        <MapContext.Provider
            style={{ display: "flex" }}
            value={{
                floor,
                myLocker,
                setMyLocker,
                reservationStatus,
                setReservationStatus,
            }}>
            <MapContainer>
                <ImageContainer>
                    {floor === 323 && <Image src={F323} alt="323앞" />}
                    {floor === 3220 && <Image src={F322B} alt="322앞문" />}
                    {floor === 3221 && <Image src={F322F} alt="322뒷문" />}
                    {floor === 221 && <Image src={F221} alt="221앞" />}
                    {floor === 220 && <Image src={F220} alt="220앞" />}
                    {floor === 124 && <Image src={F124} alt="124앞" />}
                    {floor === 123 && <Image src={F123} alt="123앞" />}
                    {floor === 117 && <Image src={F117} alt="117앞" />}
                    {floor === 116 && <Image src={F116} alt="116앞" />}
                    {floor === 115 && <Image src={F115} alt="115앞" />}
                </ImageContainer>
                <FormContainer>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            위치
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={floor}
                            label="floor"
                            onChange={handleChange}
                            fullWidth>
                            <MenuItem value={115}>
                                {" "}
                                115 앞(컴공, SW융합){" "}
                            </MenuItem>
                            <MenuItem value={116}>
                                {" "}
                                116 앞(컴공, SW융합){" "}
                            </MenuItem>
                            <MenuItem value={117}> 117 앞 (정통) </MenuItem>
                            <MenuItem value={123}> 123 앞 (정통)</MenuItem>
                            <MenuItem value={124}> 124 앞 (정통)</MenuItem>
                            <MenuItem value={220}>
                                {" "}
                                220 앞 (컴공, SW융합)
                            </MenuItem>
                            <MenuItem value={221}>
                                {" "}
                                221 앞 (컴공, SW융합)
                            </MenuItem>
                            <MenuItem value={3220}> 322 뒷문 (정통)</MenuItem>
                            <MenuItem value={3221}> 322 앞문 (정통)</MenuItem>
                            <MenuItem value={323}> 323 앞 (정통)</MenuItem>
                        </Select>
                    </FormControl>
                </FormContainer>
                <StateContainer>
                    <ColorState
                        states={[
                            { color: "#D9D9D9", text: "대여 불가능" },
                            { color: "#879fc8", text: "대여 가능" },
                            { color: "#E26C6C", text: "선택" },
                            { color: "#9AC586", text: "내 사물함" },
                        ]}
                    />
                </StateContainer>
                {authenticated && myLocker ? (
                    <CancleButton onClick={hadleCancle}>예약취소</CancleButton>
                ) : (
                    <></>
                )}
            </MapContainer>
            <Locker />
        </MapContext.Provider>
    );
};

const MapContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 387px;
    padding-left: 50px;
    min-width: 387px;

    @media screen and (max-width: 1100px) {
        margin: 30px;
        align-items: center;
        flex: 1 1 50%;
        padding: 0px;
        min-width: 50%;
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    @media screen and (max-width: 1100px) {
        width: 80%;
    }
`;

const Image = styled.img`
    width: 100%;
`;

const FormContainer = styled.div`
    background-color: #ffffff;
    margin-top: 50px;
    width: 100%;
    @media screen and (max-width: 1100px) {
        width: 80%;
    }
`;

const StateContainer = styled.div`
    width: 100%;
    @media screen and (max-width: 1100px) {
        width: 80%;
    }
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

    @media screen and (max-width: 1100px) {
        width: 80%;
    }
`;

export default Map;

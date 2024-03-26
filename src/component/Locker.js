import React from "react";
import { useState, useEffect, useContext } from "react";
import { useAccessToken } from "../store/UseStore";
import { getLocker } from "../api/Lockers";
import { MapContext } from "./Map";
import { postReserve } from "../api/Lockers";
import { useAuthenticated } from "../store/UseStore";

import locker_handle from "../asset/locker_handle.png";
import styled from "styled-components";

function Locker() {
    const token = useAccessToken(); // accessToken 가져오기
    const authenticated = useAuthenticated(); // 로그인 여부 가져오기

    const [locker, setLocker] = useState(); // locker 상태 가져오기
    const [selectedButton, setSelectedButton] = useState(null); // 선택된 버튼의 좌표 저장

    const [maxRow, setMaxRow] = useState(0); // 최대 행 수
    const [maxCol, setMaxCol] = useState(0); // 최대 열 수
    const [disabledLockers, setDisabledLockers] = useState({}); // 이미 예약된 사물함

    const {
        floor,
        myLocker,
        setMyLocker,
        reservationStatus,
        setReservationStatus,
    } = useContext(MapContext);

    // 사물함 정보 조회
    useEffect(() => {
        const fetchLocker = async () => {
            const accessToken = token ? token.accessToken : null;
            const response = await getLocker(accessToken, floor);
            if (response) {
                setLocker(response);
                setMaxRow(response.maxRow);
                setMaxCol(response.maxColumn);
                setDisabledLockers(response.lockers);
                setMyLocker(response.myLocker);
            }
        };
        setSelectedButton(null);
        fetchLocker();
    }, [token, floor, setMyLocker, reservationStatus]);

    // 사물함 버튼 생성
    const createLockerButtons = () => {
        let rows = Array(maxRow)
            .fill(null)
            .map(() => []);
        for (let i = 0; i < maxRow; i++) {
            for (let j = 0; j < maxCol; j++) {
                let button = {
                    row: i,
                    col: j,
                    myLocker: false,
                    disabled: false,
                };
                if (
                    disabledLockers.some(
                        (locker) => locker.row === i && locker.col === j
                    )
                ) {
                    button.disabled = true;
                }
                if (
                    myLocker &&
                    myLocker.roomLocation === floor &&
                    myLocker.row === i &&
                    myLocker.col === j
                ) {
                    button.myLocker = true;
                }

                rows[i].push(button);
            }
        }

        return rows;
    };

    // 선택된 버튼 처리
    const handleButtonClick = (button) => {
        if (authenticated && !myLocker) {
            setSelectedButton(button); // 예약 사물함 위치 update

            setTimeout(async () => {
                const isConfirmed = window.confirm("예약하시겠습니까?");
                if (isConfirmed) {
                    // 예약 확인
                    const reservation = {
                        roomLocation: floor,
                        row: button.row,
                        column: button.col,
                    };
                    await postReserve(token.accessToken, reservation);
                    setReservationStatus("reserved");
                }
            }, 0);
        } else {
            myLocker
                ? alert(
                      `이미 예약한 사물함이 존재합니다. \n취소 후 다시 예약해주세요.`
                  )
                : alert("로그인 후 예약하세요.");
        }
    };

    return (
        <LockerContainer>
            {createLockerButtons().map((rowButtons, rowIndex) => (
                <LockerRow key={rowIndex}>
                    {rowButtons.map((button, buttonIndex) => (
                        <LockerButton
                            key={buttonIndex}
                            disabled={button.disabled}
                            $isSelected={
                                selectedButton &&
                                selectedButton.row === button.row &&
                                selectedButton.col === button.col
                            }
                            $isMyLocker={button.myLocker}
                            onClick={() => handleButtonClick(button)}>
                            <LockerImg src={locker_handle} alt="이미지" />
                        </LockerButton>
                    ))}
                </LockerRow>
            ))}
        </LockerContainer>
    );
}

export default Locker;

// 기존 LockerContainer 유지
const LockerContainer = styled.div`
    flex: 1 1 70%;
    margin-right: 40px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 5px;
    overflow-x: overlay;
    overflow-y: overlay;

    &::-webkit-scrollbar {
        width: 14px;
        height: 14px;
    }

    // 스크롤바 디자인
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        border: 4px solid transparent;
        box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.15);
    }

    &::-webkit-scrollbar-thumb:hover {
        border: 4px solid transparent;
        box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.3);
    }

    &::-webkit-scrollbar-track {
        box-shadow: none;
        background-color: transparent;
    }

    @media screen and (max-width: 1100px) {
        align-items: flex-start;
        margin-right: 0px;
        max-width: 60%;
    }
`;

// Locker 한 줄
const LockerRow = styled.div`
    display: flex;
    gap: 5px;
`;

// 버튼 스타일을 위한 styled component 추가
const LockerButton = styled.button`
    background-color: ${(props) =>
        props.$isSelected
            ? "#E26C6C"
            : props.$isMyLocker
            ? "#9AC586"
            : props.disabled
            ? "#D9D9D9"
            : "#A3B1CA"};
    margin: 0px 2px;
    padding: 10px;
    border: none;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    width: 70px;
    cursor: ${(props) => (props.disabled ? "" : "pointer")};

    @media screen and (max-width: 515px) {
        padding: 10px;
        width: 50px;
    }
`;

const LockerImg = styled.img`
    width: 100%;
`;

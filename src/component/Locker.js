import React from "react";
import { useState, useEffect, useContext } from "react";
import { useAccessToken } from "../store/UseStore";
import { getLocker } from "../api/Lockers";
import { MapContext } from "./Map";
import { postReserve } from "../api/Lockers";

import locker_handle from "../asset/locker_handle.png";

import styled from "styled-components";

function Locker() {
    const token = useAccessToken(); // accessToken 가져오기

    const [locker, setLocker] = useState(); // locker 상태 가져오기
    const [selectedButton, setSelectedButton] = useState(null); // 선택된 버튼의 좌표 저장

    const [maxRow, setMaxRow] = useState(0); // 행
    const [maxCol, setMaxCol] = useState(0); // 열
    const [disabledLockers, setDisabledLockers] = useState({}); // 이미 예약된 사물함
    const [myLocker, setMyLocker] = useState(); // 내 사물함 위치

    const { floor } = useContext(MapContext);

    // 좌석 조회
    useEffect(() => {
        const fetchLocker = async () => {
            const accessToken = token ? token.accessToken : null;
            const response = await getLocker(accessToken, floor);
            setLocker(response);
            setMaxRow(response.maxRow);
            setMaxCol(response.maxColumn);
            setDisabledLockers(response.lockers);
            setMyLocker(response.myLocker);
        };
        fetchLocker();
    }, [token, floor]);

    useEffect(() => {
        console.log(locker);
    }, [locker]);

    // 버튼 선택 핸들러
    const handleSelectButton = (i, j) => {
        if (!isDisabledButton(i, j)) {
            setSelectedButton({ row: i, col: j });
        }
    };

    // 선택된 버튼인지 확인하는 함수
    const isSelectedButton = (i, j) => {
        return (
            selectedButton &&
            selectedButton.row === i &&
            selectedButton.col === j
        );
    };

    // 주어진 좌표가 비활성화할 버튼의 좌표 배열에 있는지 확인
    const isDisabledButton = (i, j) => {
        return disabledLockers.some(
            (button) => button.row === i && button.col === j
        );
    };

    // 나의 사물함 위치
    const isMyLocker = (i, j) => {
        return myLocker ? myLocker.row === i && myLocker.col === j : null;
    };

    // 버튼 스타일 결정 함수
    const getButtonStyle = (i, j) => {
        const baseStyle = {
            backgroundColor: "#A3B1CA",
            border: "none",
            padding: "10px",
            borderRadius: "10px",
            margin: "5px",
            cursor: "pointer",
        };

        if (isMyLocker(i, j)) {
            return {
                ...baseStyle,
                backgroundColor: "#9AC586",
            };
        } else if (isSelectedButton(i, j)) {
            return {
                ...baseStyle,
                backgroundColor: "#e26c6c",
            };
        } else if (isDisabledButton(i, j)) {
            return {
                ...baseStyle,
                backgroundColor: "#D9D9D9",
                cursor: "default",
            };
        }

        return baseStyle;
    };

    // 사물함 버튼 생성
    const createButtons = (rows, cols) => {
        const buttons = [];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const buttonStyle = getButtonStyle(i, j);
                const disabled = isDisabledButton(i, j);

                buttons.push(
                    <button
                        key={`button-${i}-${j}`}
                        style={buttonStyle}
                        onClick={() => !disabled && handleSelectButton(i, j)}
                        disabled={disabled}
                        type="button">
                        <img
                            src={locker_handle}
                            alt="locker"
                            style={{ width: "50px" }}
                        />
                    </button>
                );
            }
            buttons.push(<br key={`break-${i}`} />);
        }
        return buttons;
    };

    return (
        <div style={{ marginBottom: "50px" }}>
            {locker ? createButtons(maxRow, maxCol) : null}
        </div>
    );
}

export default Locker;

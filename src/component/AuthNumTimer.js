import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Timer = styled.p`
    font-size: small;
    text-align: left;
    color: #666666;
    margin-top: 5px;
`;

function AuthNumTimer({ timerRunning, setTimerRunning }) {
    const initialTime = 180; //초기 타이머 시간(초)
    const [remainingTime, setRemainingTime] = useState(initialTime); // 남은 시간

    useEffect(() => {
        let timerId;
        console.log('타이머 실행');
        if (timerRunning) {
            timerId = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime === 0) {
                        clearInterval(timerId);
                        setTimeout(() => {
                            // 상태 업데이트를 지연시켜 동시 업데이트 피하기
                            setTimerRunning(false); // 지연 후 타이머 종료
                        }, 0);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerId);
    }, [timerRunning, setTimerRunning]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <>
            <Timer>
                인증번호 유효 시간 : <span style={{ color: 'red' }}>{formatTime(remainingTime)}</span>
            </Timer>
        </>
    );
}

export default AuthNumTimer;

import React from "react";
import Header from "../component/Header";
import Map from "../component/Map";

import styled from "styled-components";

// 예약 메인 화면
function Main() {
    return (
        <div>
            <Header />
            <MainContainer>
                <Map />
            </MainContainer>
            <Notice>
                ※ 본인 전공 전용 사물함에 예약했을 시, 임의로 다른 곳에 배정될
                수 있습니다.
            </Notice>
        </div>
    );
}

export default Main;

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 8%;
    gap: 50px;

    @media screen and (max-width: 1100px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0px;
    }
`;

const Notice = styled.p`
    text-align: left;
    padding-left: 50px;

    @media screen and (max-width: 1100px) {
        text-align: center;
        padding: 0px;
        margin: -30px 0px 30px;
    }
`;

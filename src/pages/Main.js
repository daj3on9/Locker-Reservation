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
        </div>
    );
}

export default Main;

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 50px;

    @media screen and (max-width: 1020px) {
        display: flex;
        flex-direction: column;
    }
`;

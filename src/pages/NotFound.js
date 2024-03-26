import React from "react";
import yu_logo from "../asset/yu_logo.svg";
import GlobalStyles from "../style/GlobalStyles";
import styled from "styled-components";

function NotFound() {
    return (
        <>
            <GlobalStyles />
            <div className="center-view ">
                <div className="view-header">
                    <a href="/" style={{ textDecoration: "none" }}>
                        <img src={yu_logo} alt="영남대 로고" />
                        <h2 style={{ color: "#193973" }}>
                            {" "}
                            컴퓨터공학부 사물함 예약 시스템{" "}
                        </h2>
                    </a>
                </div>
            </div>
            <div>
                {" "}
                <p>
                    페이지가 없거나 접근할 수 없습니다.
                    <br />
                    입력하신 주소가 맞는지 다시 확인해 주세요.
                </p>
                <ToMain href="/"> 메인화면으로 이동하기 </ToMain>
            </div>
        </>
    );
}

const ToMain = styled.a`
    color: #193973;
`;

export default NotFound;

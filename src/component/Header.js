import React from "react";
import styled from "styled-components";
import yu_logo from "../asset/yu_logo.svg";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

function Header() {
    return (
        <HeaderContainer>
            <LogoImg src={yu_logo} alt="로고" />
            <Heading>컴퓨터공학부 사물함 예약 시스템</Heading>
            <IconContainer>
                <AccountCircleOutlinedIcon
                    fontSize="large"
                    sx={{ fontSize: 30 }}
                />
                <LoginText>로그인</LoginText>
            </IconContainer>
        </HeaderContainer>
    );
}

export default Header;

// styled- component
const HeaderContainer = styled.div`
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 50px;
`;

const LogoImg = styled.img`
    height: 20px;
`;

const Heading = styled.p`
    font-size: 24px;
    font-weight: bold;
    margin-left: -10%;
    color: rgb(25, 57, 115);
`;

const IconContainer = styled.div`
    color: #193973;
`;

const LoginText = styled.p`
    margin: 0px;
    font-size: 15px;
`;

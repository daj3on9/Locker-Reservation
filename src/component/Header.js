import React from "react";
import styled from "styled-components";
import yu_logo from "../asset/yu_logo.svg";
import small_yu_logo from "../asset/small_yu_logo.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { doLogout } from "../api/Users";
import { useAuthenticated } from "../store/UseStore";

const Header = () => {
    const isMobile = useMediaQuery({ query: "(max-width:1020px)" });
    const authenticated = useAuthenticated();

    const logoSrc = isMobile ? small_yu_logo : yu_logo;
    const fontSize = isMobile ? "small" : "medium";

    // 로그아웃 버튼
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();

        doLogout(dispatch);
    };

    return (
        <HeaderContainer $isMobile={isMobile}>
            <LogoImg src={logoSrc} alt="로고" />
            <Heading $isMobile={isMobile}>
                컴퓨터공학부 사물함 예약 시스템
            </Heading>
            <Link
                to={authenticated ? "/" : "/login"}
                style={{ textDecoration: "none" }}>
                <IconContainer>
                    <AccountCircleOutlinedIcon fontSize={fontSize} />
                    {authenticated ? (
                        <LoginText $isMobile={isMobile} onClick={handleLogout}>
                            로그아웃
                        </LoginText>
                    ) : (
                        <LoginText $isMobile={isMobile}>로그인</LoginText>
                    )}
                </IconContainer>
            </Link>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.div`
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${(props) => (props.$isMobile ? "0px 20px" : "0px 50px")};
`;

const LogoImg = styled.img`
    height: 20px;
`;

const Heading = styled.p`
    font-size: ${(props) => (props.$isMobile ? "15px" : "20px")};
    font-weight: bold;

    color: rgb(25, 57, 115);
`;

const IconContainer = styled.div`
    color: #193973;
`;

const LoginText = styled.p`
    margin: 0px;
    font-size: ${(props) => (props.$isMobile ? "10px" : "15px")};
`;

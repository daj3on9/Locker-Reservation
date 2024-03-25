import React from "react";
import styled from "styled-components";
import yu_logo from "../asset/yu_logo.svg";
import small_yu_logo from "../asset/small_yu_logo.png";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { doLogout } from "../api/Users";
import { useAuthenticated, useUserName } from "../store/UseStore";

const Header = () => {
    const isMobile = useMediaQuery({ query: "(max-width:1020px)" });
    const authenticated = useAuthenticated();
    const userName = useUserName();

    const logoSrc = isMobile ? small_yu_logo : yu_logo;

    // 로그아웃 버튼
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();

        doLogout(dispatch);
    };

    return (
        <HeaderContainer>
            <LogoImg src={logoSrc} alt="로고" />
            <Heading>컴퓨터공학부 사물함 예약 시스템</Heading>
            <UserContainer>
                {authenticated ? (
                    <UserName>
                        <b>{userName}</b>님.
                    </UserName>
                ) : (
                    <UserName> 로그인 후 예약해주세요! </UserName>
                )}
                <Link
                    to={authenticated ? "/" : "/login"}
                    style={{ textDecoration: "none" }}>
                    {authenticated ? (
                        <LoginText onClick={handleLogout}>로그아웃</LoginText>
                    ) : (
                        <LoginText>로그인</LoginText>
                    )}
                </Link>
            </UserContainer>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.div`
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 50px;

    @media screen and (max-width: 768px) {
        padding: 0px 20px;
    }
`;

const LogoImg = styled.img`
    height: 20px;
`;

const Heading = styled.p`
    font-size: 20px;
    font-weight: bold;

    color: rgb(25, 57, 115);

    @media screen and (max-width: 768px) {
        font-size: 15px;
    }
`;

const UserContainer = styled.div`
    display: flex;
    color: #193973;
    align-items: center;
    gap: 40px;
    font-size: 15px;

    @media screen and (max-width: 768px) {
        font-size: 10px;
        gap: 5px;
    }
`;

const LoginText = styled.p`
    margin: 0px;
    font-size: 15px;
    color: #193973;
    @media screen and (max-width: 768px) {
        font-size: 10px;
    }
`;

const UserName = styled.div`
    text-align: left;
`;

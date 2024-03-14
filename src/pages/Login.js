// Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postLogin } from "../api/Users";

import yu_logo from "../asset/yu_logo.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { ThemeProvider } from "@mui/material/styles";
import { largeButtonTheme } from "../style/theme";
import GlobalStyles from "../style/GlobalStyles";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        studentId: "",
        password: "",
    });

    // 로그인 설정
    const onChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // API 전송
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await postLogin(user, dispatch);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <GlobalStyles /> {/* 전역 스타일 적용 */}
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
                <div className="user-container">
                    <form className="user-form" onSubmit={onSubmit}>
                        <TextField
                            required
                            fullWidth
                            label="학번"
                            variant="standard"
                            size="small"
                            name="studentId"
                            onChange={onChange}
                        />
                        <TextField
                            required
                            fullWidth
                            label="비밀번호"
                            variant="standard"
                            size="small"
                            type="password"
                            name="password"
                            onChange={onChange}
                        />
                        <ThemeProvider theme={largeButtonTheme}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit">
                                Login
                            </Button>
                        </ThemeProvider>
                    </form>
                    <Link href="/register" underline="always" color={"#213775"}>
                        회원가입 하러 가기
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Login;

// Login.js
import React from 'react';
import yu_logo from '../asset/yu_logo.svg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import { largeButtonTheme } from '../style/theme';
import GlobalStyles from '../style/GlobalStyles';

function Login() {
    return (
        <>
            <GlobalStyles /> {/* 전역 스타일 적용 */}
            <div className="center-view ">
                <div className="view-header">
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <img src={yu_logo} alt="영남대 로고" />
                        <h2 style={{ color: '#193973' }}> 컴퓨터공학부 사물함 예약 시스템 </h2>
                    </a>
                </div>
                <div className="user-container">
                    <div className="user-form">
                        <TextField fullWidth label="학번" variant="standard" size="small" />
                        <TextField fullWidth label="비밀번호" variant="standard" size="small" type="password" />
                        <ThemeProvider theme={largeButtonTheme}>
                            <Button variant="contained" color="primary">
                                Login
                            </Button>
                        </ThemeProvider>
                    </div>
                    <Link href="/register" underline="always" color={'#213775'}>
                        회원가입 하러 가기
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Login;

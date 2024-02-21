import React from 'react';
import '../style/Login.css';
import yu_logo from '../asset/yu_logo.svg';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider, alpha, getContrastRatio } from '@mui/material/styles';

function Login() {
    const blueBase = '#003C84';
    const blueMain = alpha(blueBase, 0.8);

    const theme = createTheme({
        palette: {
            blue: {
                main: blueMain,
                light: alpha(blueBase, 0.5),
                dark: alpha(blueBase, 0.9),
                contrastText: getContrastRatio(blueMain, '#fff') > 4.5 ? '#fff' : '#111',
            },
        },
    });

    return (
        <div className="login">
            <div className="login-header">
                <img src={yu_logo} alt="영남대 로고" />
                <h2 style={{ color: '#193973' }}> 컴퓨터공학부 사물함 예약 시스템 </h2>
            </div>
            <div className="login-container">
                <div className="form">
                    <TextField id="standard-basic" fullWidth label="학번" variant="standard" size="small" />
                    <TextField
                        id="standard-basic"
                        fullWidth
                        label="비밀번호"
                        variant="standard"
                        size="small"
                        type="password"
                    />
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="blue">
                            Login
                        </Button>
                    </ThemeProvider>
                </div>
                <Link href="/" underline="always" color={'#213775'}>
                    회원가입 하러 가기
                </Link>
            </div>
        </div>
    );
}

export default Login;

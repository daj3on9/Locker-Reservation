import React from 'react';
import '../style/common.css';
import yu_logo from '../asset/yu_logo.svg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import buttonTheme from '../style/theme';

function Register() {
    return (
        <div className="center-view">
            <div className="view-header">
                <a href="/" style={{ textDecoration: 'none' }}>
                    <img src={yu_logo} alt="영남대 로고" />
                    <h2 style={{ color: '#193973' }}> 컴퓨터공학부 사물함 예약 시스템 </h2>
                </a>
            </div>
            <div className="user-container">
                <div className="user-form">
                    <TextField fullWidth label="학번" variant="standard" size="small" />
                    <TextField fullWidth label="이름" variant="standard" size="small" />
                    <TextField fullWidth label="비밀번호" variant="standard" size="small" type="password" />
                    <TextField fullWidth label="학과" variant="standard" size="small" />
                    <TextField fullWidth label="전화번호" variant="standard" size="small" />
                    <ThemeProvider theme={buttonTheme}>
                        <Button variant="contained" color="primary">
                            회원 가입
                        </Button>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
}

export default Register;

import React, { useState } from 'react';
import { postUser, postNumber, confirmNumber } from '../api/Users';

import yu_logo from '../asset/yu_logo.svg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Select } from '@mui/material';
import GlobalStyles from '../style/GlobalStyles';
import styled from 'styled-components';
import { ThemeProvider } from '@mui/material/styles';
import { largeButtonTheme, smallButtonTheme } from '../style/theme';

const AuthNumber = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`;

function Register() {
    const [form, setForm] = useState({
        studentId: '',
        password: '',
        departmentName: '',
        phoneNumber: '',
        studentName: '',
    });

    const [certificationNumber, setCertificationNumber] = useState(''); //인증번호
    const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 확인
    const [digitError, setDigitError] = useState(false); // 전화번호 미입력
    const [cerNumError, SetCerNumError] = useState(false); // 인증번호 미입력

    // 회원가입 정보 설정
    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === 'confirmPassword') {
            setPasswordMatch(value === form.password);
        }
    };

    // 인증 번호 설정
    const onCfNumberChange = (e) => {
        e.preventDefault();
        setCertificationNumber(e.target.value);
    };

    // 인증번호 요청
    const requestCertification = (e) => {
        e.preventDefault();
        if (form.phoneNumber === '') {
            setDigitError(true);
        } else {
            setDigitError(false);
            const phoneNumber = { phoneNumber: form.phoneNumber };
            postNumber(phoneNumber);
        }
    };

    // 인증번호 확인
    const confirmCertification = (e) => {
        e.preventDefault();
        if (form.phoneNumber === '' || certificationNumber === '') {
            form.phoneNumber === '' ? setDigitError(true) : setDigitError(false);
            certificationNumber === '' ? SetCerNumError(true) : SetCerNumError(false);
        } else {
            setDigitError(false);
            SetCerNumError(false);
            const certification = {
                phoneNumber: form.phoneNumber,
                certificationNumber: certificationNumber,
            };
            confirmNumber(certification);
        }
    };

    return (
        <>
            <GlobalStyles /> {/* 전역 스타일 적용 */}
            <div className="center-view">
                <div className="view-header">
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <img src={yu_logo} alt="영남대 로고" />
                        <h2 style={{ color: '#193973' }}> 컴퓨터공학부 사물함 예약 시스템 </h2>
                    </a>
                </div>
                <div className="user-container">
                    <form
                        className="user-form"
                        onSubmit={(e) => {
                            e.preventDefault(); // 기본 제출 동작 방지
                            postUser(form); // postUser 함수 호출
                        }}
                    >
                        <TextField
                            fullWidth
                            required
                            label="학번"
                            variant="standard"
                            size="small"
                            name="studentId"
                            onChange={onChange}
                        />
                        <TextField
                            fullWidth
                            required
                            label="이름"
                            variant="standard"
                            size="small"
                            name="studentName"
                            onChange={onChange}
                        />
                        <TextField
                            fullWidth
                            required
                            label="비밀번호"
                            variant="standard"
                            size="small"
                            type="password"
                            name="password"
                            onChange={onChange}
                        />
                        <TextField
                            fullWidth
                            required
                            label="비밀번호 확인"
                            variant="standard"
                            size="small"
                            type="password"
                            name="confirmPassword"
                            onChange={onChange}
                            error={!passwordMatch}
                            helperText={!passwordMatch && '비밀번호가 일치하지 않습니다.'}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">전공</InputLabel>
                            <Select
                                required
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="department"
                                fullWidth
                                value={form.departmentName}
                                name="departmentName"
                                sx={{ textAlign: 'left' }}
                                onChange={onChange}
                            >
                                <MenuItem value={'ces'}> 컴퓨터공학전공 </MenuItem>
                                <MenuItem value={'ice'}> 정보통신공학전공 </MenuItem>
                                <MenuItem value={'sw'}> 소프트웨어공학전공 </MenuItem>
                            </Select>
                        </FormControl>
                        <AuthNumber>
                            <TextField
                                fullWidth
                                required
                                label="전화번호"
                                variant="standard"
                                size="small"
                                name="phoneNumber"
                                error={digitError}
                                helperText={digitError ? '전화번호를 입력해주세요' : ''}
                                onChange={onChange}
                            />
                            <ThemeProvider theme={smallButtonTheme}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ fontSize: '11px', padding: '8px' }}
                                    type="button"
                                    onClick={requestCertification}
                                >
                                    인증번호
                                    <br />
                                    전송
                                </Button>
                            </ThemeProvider>
                        </AuthNumber>
                        <AuthNumber>
                            <TextField
                                fullWidth
                                required
                                label="인증번호"
                                variant="standard"
                                size="small"
                                name="confirmNumber"
                                error={cerNumError}
                                helperText={cerNumError ? '인증번호를 입력해주세요' : ''}
                                onChange={onCfNumberChange}
                            />
                            <ThemeProvider theme={smallButtonTheme}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ fontSize: '11px', padding: '8px' }}
                                    type="button"
                                    onClick={confirmCertification}
                                >
                                    인증번호
                                    <br />
                                    확인
                                </Button>
                            </ThemeProvider>
                        </AuthNumber>
                        <ThemeProvider theme={largeButtonTheme}>
                            <Button variant="contained" color="primary" type="submit">
                                회원 가입
                            </Button>
                        </ThemeProvider>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;

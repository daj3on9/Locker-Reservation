import React from 'react';
import '../style/Login.css';
import yu_logo from '../asset/yu_logo.svg';

function Login() {
    return (
        <div>
            <img src={yu_logo} alt="영남대 로고" />
            <h2 style={{ color: '#193973' }}> 컴퓨터공학부 사물함 예약 시스템 </h2>
        </div>
    );
}

export default Login;

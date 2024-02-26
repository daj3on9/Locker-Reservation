// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    /* 중앙 정렬 화면 */
    .center-view {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    /* 로그인, 회원가입 헤더 */
    .view-header {
        margin-top: 100px;
    }

    .view-header a h2{
        @media screen and (max-width: 425px) {
            font-size : 20px;
        }
    }

    /* 로그인, 회원가입 컨테이너 */
    .user-container {
        margin: 30px 0px 100px;
        background-color: #ffffff;
        padding : 50px 100px;
        width: 30%;

        @media screen and (max-width: 1020px) {
            width: 60%;
            padding : 50px 30px 50px;
        }
    }

    /* 로그인, 회원가입 입력 폼 */
    .user-form {
        display: flex;
        flex-direction: column;
        gap: 50px;
        margin-bottom: 30px;
    }
`;

export default GlobalStyles;

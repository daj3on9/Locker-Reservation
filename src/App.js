import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useExpiredTime } from "./store/UseStore";
import { doLogout } from "./api/Users";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";

function App() {
    const dispatch = useDispatch();
    const expiredTime = useExpiredTime();

    // 자동 로그아웃
    useEffect(() => {
        if (!expiredTime) return;

        const timeout = setTimeout(() => {
            const currentTime = new Date().getTime();
            if (expiredTime && currentTime > expiredTime) {
                dispatch(doLogout);
            }
        }, expiredTime - new Date().getTime());

        return () => clearInterval(timeout);
    }, [expiredTime, dispatch]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;

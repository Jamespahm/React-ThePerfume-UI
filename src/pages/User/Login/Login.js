import React, { useState } from 'react';
import request from '~/utils/request';
import { Link, Navigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [sdt, setSdt] = useState('');
    const [matkhau, setMatkhau] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await request.post('/auth/login', { sdt, matkhau });
            console.log(response.data);
            const tokenUser = response.data.tokenUser;
            localStorage.setItem('tokenUser', tokenUser); // Lưu tokenUser vào localStorage
            setLoggedIn(true);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    if (loggedIn) {
        return <Navigate to="/" />; // Nếu đã đăng nhập thành công, điều hướng người dùng đến trang chính
    }

    return (
        <>
            <div className="container-login">
                <h1 className="w3ls">The Perfume ID</h1>
                <div className="content-w3ls">
                    <div className="content-agile11">
                        <Link to="/">
                            <h2 className="agileits1">THE PERFUME</h2>
                            <p className="agileits2">&#60;&#60; Quay lại trang chủ.</p>
                        </Link>
                    </div>
                    <div className="content-agile2">
                        <input
                            className="login-input"
                            type="text"
                            autoComplete="off"
                            placeholder="Email hoặc số điện thoại"
                            title="Vui lòng nhập email hoặc số điện thoại"
                            required
                            value={sdt}
                            onChange={(e) => setSdt(e.target.value)}
                        />
                        <input
                            className="login-input"
                            type="password"
                            autoComplete="off"
                            placeholder="Mật khẩu"
                            title="Vui lòng nhập mật khẩu"
                            required
                            value={matkhau}
                            onChange={(e) => setMatkhau(e.target.value)}
                        />
                        <button className="register" onClick={handleLogin}>
                            Đăng nhập
                        </button>
                        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                        <p className="wthree w3l">
                            Bạn chưa có tài khoản ? <Link to="/HTML/registeruser.html"> tạo tài khoản</Link>
                        </p>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
        </>
    );
};

export default Login;

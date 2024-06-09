import React, { useState } from 'react';
import request from '~/utils/request';
import { Link, Navigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [tenDN, setTenDN] = useState('');
    const [matkhau, setMatkhau] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!tenDN || !matkhau) {
            setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu');
            return;
        }

        try {
            const response = await request.post('/auth/login', { tenDN, matkhau });
            console.log(response.data);
            const tokenUser = response.data.tokenUser;
            localStorage.setItem('tokenUser', tokenUser); // Lưu tokenUser vào localStorage
            setLoggedIn(true);
        } catch (error) {
            setError(error.response?.data?.error || 'Đã xảy ra lỗi');
        }
    };

    const handleShowPW = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
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
                            placeholder="Username hoặc số điện thoại"
                            title="Vui lòng nhập email hoặc số điện thoại"
                            value={tenDN}
                            onChange={(e) => setTenDN(e.target.value)}
                        />
                        <input
                            className="login-input"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="off"
                            placeholder="Mật khẩu"
                            title="Vui lòng nhập mật khẩu"
                            value={matkhau}
                            onChange={(e) => setMatkhau(e.target.value)}
                        />
                        <input
                            className="custom-checkbox"
                            name="showpw"
                            type="checkbox"
                            checked={showPassword}
                            onChange={handleShowPW}
                            id="showpw"
                        />
                        <label className="checkbox-label" htmlFor="showpw">
                            Hiển thị mật khẩu
                        </label>
                        <button className="register" onClick={handleLogin}>
                            Đăng nhập
                        </button>
                        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                        <p className="wthree w3l">
                            Bạn chưa có tài khoản ? <Link to="/register"> tạo tài khoản</Link>
                        </p>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
        </>
    );
};

export default Login;

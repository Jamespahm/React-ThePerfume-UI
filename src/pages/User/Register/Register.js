import React, { useState } from 'react';
import request from '~/utils/request';
import { Link, Navigate } from 'react-router-dom';
import '../Login/Login.css';

const Register = () => {
    const [tenKH, setTenKH] = useState('');
    const [tenDN, setTenDN] = useState('');
    const [matkhau, setMatkhau] = useState('');
    const [sdt, setSdt] = useState('');
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        if (!tenKH || !tenDN || !matkhau || !sdt) {
            setError('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Kiểm tra xem sdt có đúng định dạng số điện thoại hay không
        const phoneRegex = /^0[0-9]{9}$/;
        if (!phoneRegex.test(sdt)) {
            setError('Số điện thoại đã nhập không đúng');
            return;
        }

        try {
            const response = await request.post('/auth/register', { tenKH, tenDN, matkhau, sdt });
            console.log(response.data);
            setRegistered(true);
        } catch (error) {
            setError(error.response?.data?.error || 'Đã xảy ra lỗi');
        }
    };

    const handleShowPW = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    if (registered) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container-login">
            <h1 className="w3ls">The Perfume ID</h1>
            <div className="content-w3ls">
                <div className="content-agile11">
                    <Link to="/">
                        <h2 className="agileits1">THE PERFUME</h2>
                        <p className="agileits2">&#60;&#60; Quay lại trang chủ.</p>
                    </Link>
                </div>
                <div className="content-agile22">
                    <input
                        className="login-input"
                        type="text"
                        autoComplete="off"
                        placeholder="Họ và tên"
                        title="Vui lòng nhập họ và tên"
                        value={tenKH}
                        onChange={(e) => setTenKH(e.target.value)}
                    />
                    <input
                        className="login-input"
                        type="text"
                        autoComplete="off"
                        placeholder="Tên đăng nhập"
                        title="Vui lòng nhập tên đăng nhập"
                        value={tenDN}
                        onChange={(e) => setTenDN(e.target.value)}
                    />
                    <input
                        className="login-input"
                        type="text"
                        autoComplete="off"
                        placeholder="Số điện thoại"
                        title="Vui lòng nhập số điện thoại"
                        value={sdt}
                        maxLength="10"
                        onChange={(e) => {
                            const value = e.target.value;
                            // Kiểm tra số điện thoại có bắt đầu bằng số 0 không
                            if (/^[0-9]*$/.test(value)) {
                                setSdt(value);
                            }
                        }}
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
                    <button className="register" onClick={handleRegister}>
                        Đăng ký
                    </button>
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    <p className="wthree w3l">
                        Bạn đã có tài khoản ? <Link to="/login"> Đăng nhập</Link>
                    </p>
                </div>
                <div className="clear"></div>
            </div>
        </div>
    );
};

export default Register;

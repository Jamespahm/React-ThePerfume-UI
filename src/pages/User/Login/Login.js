import React, { useState } from 'react';
import request from '~/utils/request';
import { Navigate } from 'react-router-dom';

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
        <div>
            <h2>Đăng Nhập</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input type="text" placeholder="Số điện thoại" value={sdt} onChange={(e) => setSdt(e.target.value)} />
            <input
                type="password"
                placeholder="Mật Khẩu"
                value={matkhau}
                onChange={(e) => setMatkhau(e.target.value)}
            />
            <button onClick={handleLogin}>Đăng Nhập</button>
        </div>
    );
};

export default Login;

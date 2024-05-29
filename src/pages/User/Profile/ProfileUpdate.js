import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import request from '~/utils/request';
import style from './Profile.module.scss';

const cx = classNames.bind(style);

function ProfileUpdate() {
    const [profile, setProfile] = useState();
    const [sidebarAvatar, setSidebarAvatar] = useState(null);
    const [tempProfile, setTempProfile] = useState({
        tenKH: '',
        gioitinh: '',
        sdt: '',
        email: '',
        diachi: '',
        matkhau: '',
        avatar: null,
        avatarPreview: null,
    });

    const tokenUser = localStorage.getItem('tokenUser');

    useEffect(() => {
        // Lấy thông tin hồ sơ khi component được mount
        request
            .get('/user/profile', {
                headers: {
                    Authorization: `Bearer ${tokenUser}`,
                },
            })
            .then((response) => {
                const profileData = response.data;
                const avatarUrl = profileData.avatar
                    ? `http://localhost:8080/img/user-avt/${profileData.avatar}`
                    : null;

                setProfile(profileData);
                setSidebarAvatar(avatarUrl);
                setTempProfile({
                    ...profileData,
                    avatar: profileData.avatar,
                    avatarPreview: avatarUrl,
                }); // Khởi tạo tempProfile từ profile ban đầu
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
            });
    }, [tokenUser]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];
            setTempProfile((prev) => ({ ...prev, [name]: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempProfile((prev) => ({ ...prev, avatarPreview: reader.result }));
            };
            reader.readAsDataURL(file);
        } else {
            setTempProfile((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleGenderChange = (e) => {
        setTempProfile((prev) => ({ ...prev, gioitinh: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(tempProfile).forEach((key) => {
                if (key === 'avatar') {
                    if (tempProfile[key] instanceof File) {
                        formData.append(key, tempProfile[key]);
                    } else if (tempProfile[key] && typeof tempProfile[key] === 'string') {
                        formData.append(key, profile.avatar);
                    }
                } else if (key !== 'avatarPreview') {
                    formData.append(key, tempProfile[key]);
                }
            });

            await request.put('/user/profile', formData, {
                headers: {
                    Authorization: `Bearer ${tokenUser}`,
                },
            });
            alert('Thông tin tài khoản đã được cập nhật!');
            setProfile(tempProfile); // Cập nhật profile chính thức khi nhấn 'Lưu'
            setSidebarAvatar(tempProfile.avatarPreview || `http://localhost:8080/img/user-avt/${tempProfile.avatar}`);
        } catch (error) {
            console.log('Error updating user:', error);
        }
    };

    // Kiểm tra xem profile có tồn tại không trước khi render
    if (!profile || !tempProfile) {
        return null;
    }

    return (
        <div className={cx('container')}>
            <div className={cx('sidebar')}>
                <img
                    className={cx('sidebar__profile-img')}
                    src={sidebarAvatar || `http://localhost:8080/img/user-avt/default-avatar.png`}
                    alt="Profile Avatar"
                />
                <h3 className={cx('sidebar__username')}>{profile.tenKH}</h3>
                <ul className={cx('sidebar__menu')}>
                    <li className={cx('sidebar__menu-item', 'active')}>
                        <Link to={'/myprofile'}>Tài Khoản Của Tôi</Link>
                    </li>
                    <li className={cx('sidebar__menu-item')}>
                        <Link to={'/myorder'}>Đơn Mua</Link>
                    </li>
                    <li className={cx('sidebar__menu-item')}>
                        <Link to={'/'}>Thông Báo</Link>
                    </li>
                    <li className={cx('sidebar__menu-item')}>
                        <Link to={'/'}>Kho Voucher</Link>
                    </li>
                    <li className={cx('sidebar__menu-item')}>
                        <Link to={'/'}>Bảo mật</Link>
                    </li>
                </ul>
            </div>
            <div className={cx('main-content')}>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                <form className={cx('profile-form')} onSubmit={handleSubmit}>
                    <div className={cx('form-left')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="tenKH">Tên</label>
                            <input
                                type="text"
                                id="tenKH"
                                name="tenKH"
                                value={tempProfile.tenKH}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="sdt">Số điện thoại</label>
                            <input type="text" id="sdt" name="sdt" value={tempProfile.sdt} onChange={handleChange} />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={tempProfile.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="diachi">Địa chỉ</label>
                            <input
                                type="text"
                                id="diachi"
                                name="diachi"
                                value={tempProfile.diachi}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label>Giới tính</label>
                            <div className={cx('gender-options')}>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        checked={tempProfile.gioitinh === 'nam'}
                                        value="nam"
                                        onChange={handleGenderChange}
                                    />
                                    Nam
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        checked={tempProfile.gioitinh === 'nữ'}
                                        value="nữ"
                                        onChange={handleGenderChange}
                                    />
                                    Nữ
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        checked={tempProfile.gioitinh === 'khác'}
                                        value="khác"
                                        onChange={handleGenderChange}
                                    />
                                    Khác
                                </label>
                            </div>
                        </div>

                        <button type="submit" className={cx('save-button')}>
                            Lưu
                        </button>
                    </div>
                    <div className={cx('form-right')}>
                        {tempProfile.avatarPreview && (
                            <img src={tempProfile.avatarPreview} alt="Preview" className={cx('img-preview')} />
                        )}
                        <input
                            type="file"
                            name="avatar"
                            onChange={handleChange}
                            className={cx('file-input')}
                            id="file-input"
                        />
                        <label htmlFor="file-input" className={cx('upload-button')}>
                            Chọn tệp
                        </label>
                        <p>Dung lượng file tối đa 1 MB Định dạng: .JPEG, .PNG</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfileUpdate;

// const days = Array.from({ length: 31 }, (_, i) => i + 1);
// const months = Array.from({ length: 12 }, (_, i) => i + 1);
// const currentYear = new Date().getFullYear();
// const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
/* <div className={cx('form-group')}>
                            <label htmlFor="birthdate">Ngày sinh</label>
                            <div id="birthdate" className={cx('birthdate')}>
                                <select id="day" value={tempProfile.ngaysinh} onChange={handleInputChange}>
                                    {days.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>
                                <select id="month" value={tempProfile.thangsinh} onChange={handleInputChange}>
                                    {months.map((month) => (
                                        <option key={month} value={month}>
                                            Tháng {month}
                                        </option>
                                    ))}
                                </select>
                                <select id="year" value={tempProfile.namsinh} onChange={handleInputChange}>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div> */

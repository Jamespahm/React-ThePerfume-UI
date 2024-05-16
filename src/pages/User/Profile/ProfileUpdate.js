// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
// import CurrencyFormat from 'react-currency-format';

import style from './Profile.module.scss';
// import request from '~/utils/request';

const cx = classNames.bind(style);

function ProfileUpdate() {
    // Tạo mảng từ 1 đến 31 cho ngày
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    // Tạo mảng từ 1 đến 12 cho tháng
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    // Lấy năm hiện tại và tạo mảng năm từ 1900 đến năm hiện tại
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

    return (
        <div className={cx('container')}>
            <div className={cx('sidebar')}>
                <img src="https://via.placeholder.com/50" alt="" className={cx('sidebar__profile-img')} />
                <h3 className={cx('sidebar__username')}>hoanghds47</h3>
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
                        <Link to={'/'}>Shopee Xu</Link>
                    </li>
                </ul>
            </div>
            <div className={cx('main-content')}>
                {/* <h1>Hồ Sơ Của Tôi</h1> */}
                <p className={cx('subtitle')}>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                <form className={cx('profile-form')}>
                    <div className={cx('form-left')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="username">Tên đăng nhập</label>
                            <input type="text" id="username" value="hoanghds47" />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="name">Tên</label>
                            <input type="text" id="name" value="Pham Huy Hoang" />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="phone">Số điện thoại</label>
                            <input type="text" id="phone" value="0866866540" />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value="hoanggfff@gmail.com" />
                        </div>
                        <div className={cx('form-group')}>
                            <label>Giới tính</label>
                            <div className={cx('gender-options')}>
                                <input type="radio" id="male" name="gender" value="male" checked />
                                <label htmlFor="male">Nam</label>
                                <input type="radio" id="female" name="gender" value="female" />
                                <label htmlFor="female">Nữ</label>
                                <input type="radio" id="other" name="gender" value="other" />
                                <label htmlFor="other">Khác</label>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="birthdate">Ngày sinh</label>
                            <div className={cx('birthdate')}>
                                <select id="day">
                                    {days.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>
                                <select id="month">
                                    {months.map((month) => (
                                        <option key={month} value={month}>
                                            Tháng {month}
                                        </option>
                                    ))}
                                </select>
                                <select id="year">
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button type="submit" className={cx('save-button')}>
                            Lưu
                        </button>
                    </div>
                    <div className={cx('form-right')}>
                        <img src="https://via.placeholder.com/100" alt="" />
                        <button className={cx('upload-button')}>Chọn Ảnh</button>
                        <p>Dung lượng file tối đa 1 MB Định dạng: .JPEG, .PNG</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfileUpdate;

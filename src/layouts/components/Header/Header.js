import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import request from '~/utils/request';
import config from '~/config/userRoutes';
import classNames from 'classnames/bind';
import style from './Header.module.scss';
import images from '~/assets/img';
// import Image from '~/components/Image';

import { MdFavoriteBorder, MdOutlineShoppingBag } from 'react-icons/md';
import { IoLanguage, IoSettingsOutline, IoEllipsisVertical } from 'react-icons/io5';
import { FaRegQuestionCircle, FaKeyboard } from 'react-icons/fa';
import { TbLogout2, TbLogin2, TbUserShield } from 'react-icons/tb';
import { FiSearch } from 'react-icons/fi';
import { RiUserLine, RiBillLine } from 'react-icons/ri';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(style);

function Header() {
    const handleLogin = () => {
        // Thực hiện chức năng logout ở đây (xóa token từ localStorage, vv.)
    };
    const MENU_ITEMS = [
        {
            icon: <IoLanguage />,
            title: 'Tiếng việt',
            children: {
                title: 'Language',
                data: [
                    {
                        type: 'language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'language',
                        code: 'vi',
                        title: 'Tiếng Việt',
                    },
                    {
                        type: 'language',
                        code: 'ja',
                        title: '日本語',
                    },
                ],
            },
        },
        {
            icon: <FaRegQuestionCircle />,
            title: 'Phản hồi & hỗ trợ',
            to: '/feedback',
        },
        {
            icon: <FaKeyboard />,
            title: 'Bàn phím & Lối tắt',
            to: '/',
        },
        {
            icon: <TbUserShield />,
            title: 'Quản trị viên',
            to: '/admin',
        },
        {
            icon: <TbLogin2 />,
            title: 'Đăng nhập',
            to: '/login',
            separate: true,
            onLogin: handleLogin, // Truyền handleLogin vào onLogin
        },
    ];

    const handleLogout = () => {
        // Thực hiện chức năng logout ở đây (xóa token từ localStorage, vv.)
        localStorage.removeItem('tokenUser');
        navigator('/');
    };
    const USER_MENU = [
        {
            icon: <RiUserLine />,
            title: 'Hồ sơ',
            to: '/myprofile',
        },
        {
            icon: <RiBillLine />,
            title: 'Đơn mua',
            to: '/myorder',
        },
        {
            icon: <IoLanguage />,
            title: 'Tiếng việt',
            children: {
                title: 'Language',
                data: [
                    {
                        type: 'language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'language',
                        code: 'vi',
                        title: 'Tiếng Việt',
                    },
                    {
                        type: 'language',
                        code: 'ja',
                        title: '日本語',
                    },
                ],
            },
        },
        {
            icon: <FaRegQuestionCircle />,
            title: 'Phản hồi & hỗ trợ',
            to: '/feedback',
        },
        {
            icon: <FaKeyboard />,
            title: 'Bàn phím & Phím tắt',
            to: '/',
        },
        {
            icon: <TbUserShield />,
            title: 'Quản trị viên',
            to: '/admin',
        },
        {
            icon: <IoSettingsOutline />,
            title: 'Cài đặt',
            to: '/feedback',
        },

        {
            icon: <TbLogout2 />,
            title: 'Đăng xuất',
            separate: true,
            to: '/',
            onLogout: handleLogout, // Truyền handleLogout vào onLogout
        },
    ];

    const tokenUser = localStorage.getItem('tokenUser');
    const [avatar, setAvatar] = useState();
    useEffect(() => {
        // Lấy thông tin hồ sơ khi component được mount
        request
            .get('/user/profile', {
                headers: {
                    Authorization: `Bearer ${tokenUser}`,
                },
            })
            .then((response) => {
                setAvatar(response.data.avatar);
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
            });
    }, [tokenUser]);
    console.log('tokenUser : ', tokenUser);
    console.log('avartar : ', avatar);
    return (
        <>
            <header className={cx('header')}>
                <div className={cx('header__top')}>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
                            <div className={cx('col-lg-6')}>
                                <div className={cx('header__top__left')}>
                                    <p>Miễn phí vận chuyển, đảm bảo hoàn trả hoặc hoàn tiền trong 30 ngày.</p>
                                </div>
                            </div>
                            <div className={cx('col-lg-6')}>
                                <div className={cx('header__top__right')}>
                                    <Link to="#">VND</Link>
                                    <Link to="#">FAQs</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('container')}>
                    <div className={cx('inner')}>
                        <div className={cx('col-lg-3', 'col-md-3')}>
                            <div className={cx('header__logo')}>
                                <Link to={config.home}>
                                    <img src={images.logoHead} alt="logo" />
                                </Link>
                            </div>
                        </div>
                        <div className={cx('col-lg-6', 'col-md-6')}>
                            <nav className={cx('header__menu', 'mobile-menu')}>
                                <ul>
                                    <li className={cx('active')}>
                                        <Link to={config.home}>Trang Chủ</Link>
                                    </li>
                                    <li>
                                        <Link to={config.shop}>Cửa Hàng</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Trang</Link>
                                        <ul className={cx('dropdown')}>
                                            <li>
                                                <Link to={config.about}> Giới Thiệu </Link>
                                            </li>
                                            <li>
                                                <Link to={'/shop-detail/slug1'}>CT Sản Phẩm</Link>
                                            </li>
                                            <li>
                                                <Link to={config.cart}>Giỏ Hàng</Link>
                                            </li>
                                            <li>
                                                <Link to={config.checkout}>Thanh Toán</Link>
                                            </li>
                                            <li>
                                                <Link to={config.favourite}>DS Yêu Thích</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to={config.news}>Tin Tức</Link>
                                    </li>
                                    <li>
                                        <Link to={config.contact}>Liên Hệ</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className={cx('col-lg-3', 'col-md-3')}>
                            <div className={cx('header__nav__option')}>
                                <Link to="#">
                                    <FiSearch />
                                </Link>
                                <Link to={config.favourite}>
                                    <MdFavoriteBorder />
                                </Link>
                                <Link to={config.cart}>
                                    <MdOutlineShoppingBag />
                                </Link>
                                {/*  */}
                                {tokenUser ? (
                                    <>
                                        <div className={cx('current-user')}>
                                            <Menu items={USER_MENU}>
                                                <img
                                                    className={cx('avatar-btn')}
                                                    src={`http://localhost:8080/img/user-avt/${avatar}`}
                                                    alt=""
                                                />
                                            </Menu>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Menu items={MENU_ITEMS}>
                                            <button className={cx('more-btn')}>
                                                <IoEllipsisVertical />
                                            </button>
                                        </Menu>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cx('canvas__open')}>
                        <i className={cx('fa fa-bars')}></i>
                    </div>
                </div>
            </header>
            {/* <div className={cx('login-form')}>
                <h2>Login Form</h2>

                <form action="/action_page.php" method="post">
                    <div class="imgcontainer">
                        <img src="img_avatar2.png" alt="Avatar" class="avatar" />
                    </div>

                    <div class="container">
                        <label for="uname">
                            <b>Username</b>
                        </label>
                        <input type="text" placeholder="Enter Username" name="uname" required />

                        <label for="psw">
                            <b>Password</b>
                        </label>
                        <input type="password" placeholder="Enter Password" name="psw" required />

                        <button type="submit">Login</button>
                        <label>
                            <input type="checkbox" checked="checked" name="remember" /> Remember me
                        </label>
                    </div>

                    <div class="container">
                        <button type="button" class="cancelbtn">
                            Cancel
                        </button>
                        <span class="psw">
                            Forgot <Link to="#">password?</Link>
                        </span>
                    </div>
                </form>
            </div> */}
        </>
    );
}

export default Header;

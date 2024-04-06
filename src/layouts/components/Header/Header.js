import { Link } from 'react-router-dom';

import config from '~/config/routes';
import classNames from 'classnames/bind';
import style from './Header.module.scss';
import images from '~/assets/img';

import { FiSearch } from 'react-icons/fi';
import { MdFavoriteBorder, MdOutlineShoppingBag } from 'react-icons/md';

const cx = classNames.bind(style);

function Header() {
    return (
        // <div className={cx('wrapper')}>
        <header className={cx('header')}>
            <div className={cx('header__top')}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-7">
                            <div className={cx('header__top__left')}>
                                <p>Miễn phí vận chuyển, đảm bảo hoàn trả hoặc hoàn tiền trong 30 ngày.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-5">
                            <div className={cx('header__top__right')}>
                                <div className={cx('header__top__links')}>
                                    <Link to="#">VND</Link>
                                    <Link to="#">FAQs</Link>
                                </div>
                                <div className={cx('header__top__hover')}>
                                    <span>
                                        Đăng Nhập <i className="arrow_carrot-down"></i>
                                    </span>
                                    <ul>
                                        <li>
                                            <p to="/user/login">Đăng Nhập</p>
                                        </li>
                                        <li>
                                            <p to="/user/signup">Đăng Ký</p>
                                        </li>
                                        <li>Đăng Xuất</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-3">
                        <div className={cx('header__logo')}>
                            <Link to={config.home}>
                                <img src={images.logoHead} alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <nav className={cx('header__menu', 'mobile-menu')}>
                            <ul>
                                <li className="active">
                                    <Link to="/user/home">Trang Chủ</Link>
                                </li>
                                <li>
                                    <Link to="/user/shop/0">Cửa Hàng</Link>
                                </li>
                                <li>
                                    <Link to="#">Trang</Link>
                                    <ul className={cx('dropdown')}>
                                        <li>
                                            <Link to="/user/about"> Giới Thiệu </Link>
                                        </li>
                                        <li>
                                            <Link to="/user/shop-details/1">CT Sản Phẩm</Link>
                                        </li>
                                        <li>
                                            <Link to="/user/shopping-cart">Giỏ Hàng</Link>
                                        </li>
                                        <li>
                                            <Link to="/user/checkout">Thanh Toán</Link>
                                        </li>
                                        <li>
                                            <Link to="/user/blog">CT Tin Tức</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/user/blog">Tin Tức</Link>
                                </li>
                                <li>
                                    <Link to="/user/contact">Liên Hệ</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <div className={cx('header__nav__option')}>
                            <Link to="#">
                                <FiSearch />
                            </Link>
                            <Link to="/user/favourite">
                                <MdFavoriteBorder />
                            </Link>
                            <Link to="/user/shopping-cart">
                                <MdOutlineShoppingBag />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={cx('canvas__open')}>
                    <i className="fa fa-bars"></i>
                </div>
            </div>
        </header>
        // </div>
    );
}

export default Header;

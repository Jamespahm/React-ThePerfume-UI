import { Link } from 'react-router-dom';

import config from '~/config/routes';
import classNames from 'classnames/bind';
import style from './Header.module.scss';
import images from '~/assets/img';

import { MdFavoriteBorder, MdOutlineShoppingBag } from 'react-icons/md';
import { IoLanguage, IoSettingsOutline, IoEllipsisVertical } from 'react-icons/io5';
import { FaRegQuestionCircle, FaKeyboard } from 'react-icons/fa';
import { TbLogout2 } from 'react-icons/tb';
import { FiBookmark, FiSearch } from 'react-icons/fi';
import { RiUserLine, RiLiveLine } from 'react-icons/ri';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(style);
const MENU_ITEMS = [
    {
        icon: <IoLanguage />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                    // children: {
                    //     title: 'language',
                    //     data: [
                    //         {
                    //             code: 'en',
                    //             title: 'English 1',
                    //             children: {
                    //                 title: 'language',
                    //                 data: [
                    //                     {
                    //                         code: 'en',
                    //                         title: 'English 2',
                    //                     },
                    //                     {
                    //                         code: 'vi',
                    //                         title: 'Tiếng Việt',
                    //                     },
                    //                     {
                    //                         code: 'ja',
                    //                         title: '日本語',
                    //                     },
                    //                 ],
                    //             },
                    //         },
                    //         {
                    //             code: 'vi',
                    //             title: 'Tiếng Việt',
                    //         },
                    //         {
                    //             code: 'ja',
                    //             title: '日本語',
                    //         },
                    //     ],
                    // },
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
        title: 'Feedback & help',
        to: '/feedback',
    },
    {
        icon: <FaKeyboard />,
        title: 'Keyboard & shortcuts',
        to: '/',
    },
];

const USER_MENU = [
    {
        icon: <RiUserLine />,
        title: 'View profile',
        to: '/feedback',
    },
    {
        icon: <FiBookmark />,
        title: 'Favourite',
        to: '/favourite',
    },
    {
        icon: <RiLiveLine />,
        title: 'Live studio',
        to: '/feedback',
    },
    {
        icon: <IoSettingsOutline />,
        title: 'Settings',
        to: '/feedback',
    },
    ...MENU_ITEMS,
    {
        icon: <TbLogout2 />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
];
function Header() {
    const currentUser = true;

    return (
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
                                {/* <div className={cx('header__top__links')}> */}
                                <Link to="#">VND</Link>
                                <Link to="#">FAQs</Link>
                                {/* </div> */}
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
                                            <Link to={config.shopDetail}>CT Sản Phẩm</Link>
                                        </li>
                                        <li>
                                            <Link to={config.cart}>Giỏ Hàng</Link>
                                        </li>
                                        <li>
                                            <Link to={config.checkout}>Thanh Toán</Link>
                                        </li>
                                        <li>
                                            <Link to={config.news}>CT Tin Tức</Link>
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
                            <Link to={config.cart}>
                                <MdFavoriteBorder />
                            </Link>
                            <Link to={config.cart}>
                                <MdOutlineShoppingBag />
                            </Link>
                            {/*  */}
                            {currentUser ? (
                                <>
                                    <div className={cx('current-user')}>
                                        <Menu items={USER_MENU}>
                                            <img
                                                className={cx('avatar-btn')}
                                                src="https://scontent.fhph2-1.fna.fbcdn.net/v/t39.30808-6/404494228_1100414251142275_2985755135866774625_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEK4alrqera-qGT85wvfbrcfYePbq_zSr19h49ur_NKvRaVpOh6ee6-O1tPguOawHOQ7jzuMv3r1zWdsdAoE_lz&_nc_ohc=SNI0Wiak-AgAb6bOrKo&_nc_ht=scontent.fhph2-1.fna&oh=00_AfAIqckNN3JKTMEiYsyG9BcTZE92q6IANwVrdx-D3ed4BA&oe=6617FB9F"
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
        // </div>
    );
}

export default Header;

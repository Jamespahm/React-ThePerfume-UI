import PropTypes from 'prop-types';
import { useState } from 'react';
import className from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import { Link } from 'react-router-dom';

import images from '~/assets/img';
const cx = className.bind(styles);

function AdminLayout({ children }) {
    const [activeTab, setActiveTab] = useState('tab-1');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('sidebar')}>
                    <div className={cx('sidebar-wrapper')}>
                        <div className={cx('logo')}>
                            <Link to="/" className={cx('simple-text')}>
                                <img src={images.logoAdmin} alt="logo" />
                            </Link>
                        </div>
                        <ul className={cx('nav')}>
                            <li className={cx(`nav-item`, `${activeTab === 'tab-1' ? 'active' : ''}`)}>
                                <Link className={cx('nav-link')} to={'/admin'} onClick={() => handleTabClick('tab-1')}>
                                    <i className={cx('nc-icon', 'nc-icon', 'nc-paper-2')}></i>
                                    <p>Dashboard</p>
                                </Link>
                            </li>
                            <li className={cx(`nav-item`, `${activeTab === 'tab-2' ? 'active' : ''}`)}>
                                <Link
                                    className={cx('nav-link')}
                                    to={'/admin/qlsp'}
                                    onClick={() => handleTabClick('tab-2')}
                                >
                                    <i className={cx('nc-icon', 'nc-bell-55')}></i>
                                    <p>Quản lý Nước hoa</p>
                                </Link>
                            </li>
                            <li className={cx(`nav-item`, `${activeTab === 'tab-3' ? 'active' : ''}`)}>
                                <Link
                                    className={cx('nav-link')}
                                    to={'/admin/qlhd'}
                                    onClick={() => handleTabClick('tab-3')}
                                >
                                    <i className={cx('nc-icon', 'nc-icon', 'nc-paper-2')}></i>
                                    <p>Quản lý Hóa đơn</p>
                                </Link>
                            </li>
                            <li className={cx(`nav-item`, `${activeTab === 'tab-4' ? 'active' : ''}`)}>
                                <Link
                                    className={cx('nav-link')}
                                    to={'/admin/qlkh'}
                                    onClick={() => handleTabClick('tab-4')}
                                >
                                    <i className={cx('nc-icon', 'nc-bell-55')}></i>
                                    <p>Quản lý Khách hàng</p>
                                </Link>
                            </li>
                            <li className={cx(`nav-item`, `${activeTab === 'tab-5' ? 'active' : ''}`)}>
                                <Link className={cx('nav-link')} to="" onClick={() => handleTabClick('tab-5')}>
                                    <i className={cx('nc-icon', 'nc-icon', 'nc-paper-2')}></i>
                                    <p>Quản lý Thương hiệu</p>
                                </Link>
                            </li>
                            <li className={cx(`nav-item`, `${activeTab === 'tab-6' ? 'active' : ''}`)}>
                                <Link className={cx('nav-link')} to="" onClick={() => handleTabClick('tab-6')}>
                                    <i className={cx('nc-icon', 'nc-bell-55')}></i>
                                    <p>Quản lý Loại</p>
                                </Link>
                            </li>
                            <li className={cx(`nav-item`, `${activeTab === 'tab-7' ? 'active' : ''}`)}>
                                <Link
                                    className={cx('nav-link', 'active')}
                                    to=""
                                    onClick={() => handleTabClick('tab-7')}
                                >
                                    <i className={cx('nc-icon', 'nc-alien-33')}></i>
                                    <p>Thống kê dữ liệu</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('main-panel')}>
                    {/* NAV */}
                    <nav className={cx('navbar', 'navbar-expand-lg')} color-on-scroll="500">
                        <div className={cx('collapse', 'navbar-collapse', 'justify-content-end')} id="navigation">
                            <h5 className={cx('navbar-nav')}>Dashboard</h5>
                            <ul className={cx('nav', 'navbar-nav', 'mr-auto')}>
                                <li className={cx('nav-item')}>
                                    <Link to="#" className={cx('nav-link')} data-toggle="dropdown">
                                        <i className={cx('nc-icon', 'nc-palette')}></i>
                                        <span className={cx('d-lg-none')}>Dashboard</span>
                                    </Link>
                                </li>
                                <li className={cx('dropdown', 'nav-item')}>
                                    <Link to="#" className={cx('dropdown-toggle', 'nav-link')} data-toggle="dropdown">
                                        <i className={cx('nc-icon', 'nc-planet')}></i>
                                        <span className={cx('notification')}>5</span>
                                        <span className={cx('d-lg-none')}>Notification</span>
                                    </Link>
                                    <ul className={cx('dropdown-menu')}>
                                        <Link className={cx('dropdown-item')} to="#">
                                            Notification 1
                                        </Link>
                                        <Link className={cx('dropdown-item')} to="#">
                                            Notification 2
                                        </Link>
                                        <Link className={cx('dropdown-item')} to="#">
                                            Notification 3
                                        </Link>
                                        <Link className={cx('dropdown-item')} to="#">
                                            Notification 4
                                        </Link>
                                        <Link className={cx('dropdown-item')} to="#">
                                            Another notification
                                        </Link>
                                    </ul>
                                </li>
                                <li className={cx('nav-item')}>
                                    <Link to="#" className={cx('nav-link')}>
                                        <i className={cx('nc-icon', 'nc-zoom-split')}></i>
                                        <span className={cx('d-lg-block')}>&nbsp;Search</span>
                                    </Link>
                                </li>
                            </ul>
                            <ul className={cx('navbar-nav', 'ml-auto')}>
                                <li className={cx('nav-item')}>
                                    <Link className={cx('nav-link')} to="#pablo">
                                        <span className={cx('no-icon')}>Account</span>
                                    </Link>
                                </li>
                                <li className={cx('nav-item', 'dropdown')}>
                                    <Link
                                        className={cx('nav-link', 'dropdown-toggle')}
                                        to="http://example.com"
                                        id="navbarDropdownMenuLink"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <span className={cx('no-icon')}>Dropdown</span>
                                    </Link>
                                    <div className={cx('dropdown-menu')} aria-labelledby="navbarDropdownMenuLink">
                                        <Link className={cx('dropdown-item')} to="#">
                                            Action
                                        </Link>
                                        <Link className={cx('dropdown-item')} to="#">
                                            Another action
                                        </Link>
                                        <Link className={cx('dropdown-item')} to="#">
                                            Something
                                        </Link>
                                        <Link className={cx('dropdown-item')} to="#">
                                            Something else here
                                        </Link>
                                        <div className={cx('divider')}></div>
                                        <Link className={cx('dropdown-item')} to="#">
                                            Separated link
                                        </Link>
                                    </div>
                                </li>
                                <li className={cx('nav-item')}>
                                    <Link className={cx('nav-link')} to="#pablo">
                                        <span className={cx('no-icon')}>Log out</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* </div> */}
                    </nav>
                    <div className={cx('content')}>
                        <div className={cx('container-fluid')}>{children}</div>
                    </div>
                    {/* <footer className={cx('footer')}>
                        <div className={cx('container-fluid')}>
                            <nav>
                                <ul className={cx('footer-menu')}>
                                    <li>
                                        <Link to="#">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Company</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Portfolio</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Blog</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </footer> */}
                </div>
            </div>
        </>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;

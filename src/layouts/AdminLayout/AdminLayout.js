import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import className from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { AiTwotoneShop } from 'react-icons/ai';
import { GoProjectRoadmap } from 'react-icons/go';
import { BsBox } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { PiUserSquare } from 'react-icons/pi';
import images from '~/assets/img';
import request from '~/utils/request';

const cx = className.bind(styles);

function AdminLayout({ children }) {
    const [activeTab, setActiveTab] = useState('tab-1');
    const [notifications, setNotifications] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownnRef = useRef(null);
    const navigator = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await request.get('/notification/unread');
                setNotifications(res.data);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchNotifications();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownnRef.current && !dropdownnRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const deleteNotification = async (notificationId) => {
        try {
            await request.delete(`/notification/${notificationId}/delete`);
            const updatedNotifications = notifications.filter((notification) => notification.idTB !== notificationId);
            setNotifications(updatedNotifications);
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };
    const readNotification = async (notificationId) => {
        try {
            await request.put(`/notification/${notificationId}/read`);
            const updatedNotifications = notifications.filter((notification) => notification.idTB !== notificationId);
            setNotifications(updatedNotifications);
            navigator('/admin/qlhd');
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
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
                            <li className={cx('nav-item', { active: activeTab === 'tab-1' })}>
                                <Link className={cx('nav-link')} to={'/admin'} onClick={() => handleTabClick('tab-1')}>
                                    <RxDashboard className={cx('nav-icon')} /> <p>Dashboard</p>
                                </Link>
                            </li>
                            <li className={cx('nav-item', { active: activeTab === 'tab-2' })}>
                                <Link
                                    className={cx('nav-link')}
                                    to={'/admin/qlsp'}
                                    onClick={() => handleTabClick('tab-2')}
                                >
                                    <BsBox className={cx('nav-icon')} />
                                    <p>Quản lý Nước hoa</p>
                                </Link>
                            </li>
                            <li className={cx('nav-item', { active: activeTab === 'tab-3' })}>
                                <Link
                                    className={cx('nav-link')}
                                    to={'/admin/qlhd'}
                                    onClick={() => handleTabClick('tab-3')}
                                >
                                    <GoProjectRoadmap className={cx('nav-icon')} />
                                    <p>Quản lý Hóa đơn</p>
                                </Link>
                            </li>
                            <li className={cx('nav-item', { active: activeTab === 'tab-4' })}>
                                <Link
                                    className={cx('nav-link')}
                                    to={'/admin/qlkh'}
                                    onClick={() => handleTabClick('tab-4')}
                                >
                                    <PiUserSquare className={cx('nav-icon')} />
                                    <p>Quản lý Khách hàng</p>
                                </Link>
                            </li>
                            <li className={cx('nav-item', { active: activeTab === 'tab-5' })}>
                                <Link
                                    className={cx('nav-link')}
                                    to={'/admin/qlth'}
                                    onClick={() => handleTabClick('tab-5')}
                                >
                                    <AiTwotoneShop className={cx('nav-icon')} />
                                    <p>Quản lý Thương hiệu</p>
                                </Link>
                            </li>
                            <li className={cx('nav-item', { active: activeTab === 'tab-6' })}>
                                <Link
                                    className={cx('nav-link')}
                                    to={'/admin/qll'}
                                    onClick={() => handleTabClick('tab-6')}
                                >
                                    <BiCategory className={cx('nav-icon')} />
                                    <p>Quản lý Loại</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('main-panel')}>
                    <nav className={cx('navbar', 'navbar-expand-lg')}>
                        <div className={cx('collapse', 'navbar-collapse', 'justify-content-end')}>
                            <ul className={cx('navbar-nav', 'ml-auto')}>
                                <li
                                    className={cx('nav-item', 'dropdownn', { open: isDropdownOpen })}
                                    ref={dropdownnRef}
                                >
                                    <Link to="#" className={cx('nav-link')} onClick={toggleDropdown}>
                                        <span className={cx('notification')}>{notifications.length}</span>
                                        <span className={cx('d-lg')}>Thông báo</span>
                                    </Link>
                                    {isDropdownOpen && (
                                        <div className={cx('dropdownn-menu', 'show')}>
                                            {notifications.length > 0 ? (
                                                notifications.map((notification, index) => (
                                                    <div key={index} className={cx('dropdownn-item')}>
                                                        <span
                                                            className={cx('notification-content')}
                                                            onClick={() => readNotification(notification.idTB)}
                                                        >
                                                            {notification.noidung}
                                                        </span>
                                                        <button onClick={() => deleteNotification(notification.idTB)}>
                                                            &times;
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <span className={cx('dropdownn-item')}>Không có thông báo mới</span>
                                            )}
                                        </div>
                                    )}
                                </li>
                                <li className={cx('nav-item')}>
                                    <Link className={cx('nav-link')} to="#">
                                        <span className={cx('no-icon')}>Tài khoản</span>
                                    </Link>
                                </li>
                                <li className={cx('nav-item')}>
                                    <Link className={cx('nav-link')} to="#">
                                        <span className={cx('no-icon')}>Đăng xuất</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className={cx('content')}>
                        <div className={cx('container-fluid')}>{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;

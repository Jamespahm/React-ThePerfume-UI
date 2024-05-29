import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import CurrencyFormat from 'react-currency-format';

import style from './Profile.module.scss';
import request from '~/utils/request';

const cx = classNames.bind(style);

function Profile() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Trạng thái cho trang hiện tại
    const [totalPages, setTotalPages] = useState(1); // Trạng thái cho tổng số trang
    const [profile, setProfile] = useState();
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
                setProfile(response.data);
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
            });
    }, [tokenUser]);

    console.log('profile: ', profile);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                if (profile) {
                    const response = await request.get('/order/orderitems', {
                        // headers: {
                        //     Authorization: `Bearer ${tokenUser}`, // Gửi tokenUser trong header
                        // },
                        params: {
                            userId: profile.idKH,
                            page: currentPage, // Gửi trang hiện tại
                            limit: 5, // Gửi số lượng mục trên mỗi trang
                        },
                    });
                    setItems(response.data.orders); // Đặt mục nhận được từ API
                    setTotalPages(response.data.totalPages); // Đặt tổng số trang nhận được từ API
                }
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchItems();
    }, [profile, currentPage]); // Thêm currentPage vào danh sách phụ thuộc
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage); // Cập nhật trang hiện tại
    };
    if (!profile) {
        return;
    }
    console.log('order: ', items);
    return (
        <div className={cx('container')}>
            <div className={cx('sidebar')}>
                <img
                    className={cx('sidebar__profile-img')}
                    src={`http://localhost:8080/img/user-avt/${profile.avatar}`}
                    alt=""
                />
                <h3 className={cx('sidebar__username')}>{profile.tenKH}</h3>
                <ul className={cx('sidebar__menu')}>
                    <li className={cx('sidebar__menu-item')}>
                        <Link to={'/myprofile'}>Tài Khoản Của Tôi</Link>
                    </li>
                    <li className={cx('sidebar__menu-item', 'active')}>
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
            <div className={cx('content')}>
                <div className={cx('navbar')}>
                    <Link to={'#'}>Tất cả</Link>
                    <Link to={'#'}>Chờ xác nhận</Link>
                    <Link to={'#'}>Đang giao</Link>
                    <Link to={'#'}>Hoàn thành</Link>
                    <Link to={'#'}>Đã hủy</Link>
                    <Link to={'#'}>Trả hàng</Link>
                </div>
                {items.map((item) => (
                    <div key={item.idHD} className={cx('order')}>
                        <div className={cx('order__header')}>
                            <div className={cx('order__status')}>{item.trangthai}</div>
                        </div>
                        {item.details.map((detail) => (
                            <div key={detail.idCTHD} className={cx('order__item')}>
                                <img
                                    src={`http://localhost:8080/img/products/${detail.hinhanh1}`}
                                    alt=""
                                    className={cx('order__item-img')}
                                />
                                <div className={cx('order__item-details')}>
                                    <h3 className={cx('order__item-title')}>{detail.tenNH}</h3>
                                    <p className={cx('order__item-capacity')}>Dung tích: {detail.dungtich}</p>
                                    <span>x{detail.soLuong}</span>
                                </div>
                                <div className={cx('order__item-price')}>
                                    <CurrencyFormat
                                        value={detail.giaban}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' VND'}
                                    />
                                </div>
                            </div>
                        ))}

                        <div className={cx('order__footer')}>
                            <div className={cx('order__price')}>
                                Tổng tiền:
                                <CurrencyFormat
                                    value={item.tongtien}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' VND'}
                                />
                            </div>
                            <div className={cx('order__actions')}></div>
                        </div>
                    </div>
                ))}

                <div className="row">
                    <div className="col-lg-12">
                        <div className={cx('product__pagination')}>
                            {[...Array(totalPages)].map((_, index) => (
                                <Link
                                    key={index}
                                    className={cx({ active: index + 1 === currentPage })}
                                    to="#"
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;

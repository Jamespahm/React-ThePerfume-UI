import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import CurrencyFormat from 'react-currency-format';

import style from './Profile.module.scss';
import request from '~/utils/request';
import DetailOrder from '~/components/DetailOrder';

const cx = classNames.bind(style);

function Myorder() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Trạng thái cho trang hiện tại
    const [totalPages, setTotalPages] = useState(1); // Trạng thái cho tổng số trang
    const [profile, setProfile] = useState();
    const [selectedOrder, setSelectedOrder] = useState(null); // Trạng thái cho đơn hàng được chọn
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái cho modal
    const [trangthai, setTrangThai] = useState('0'); // Trạng thái cho modal
    // const [copySuccess, setCopySuccess] = useState(false);

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

    console.log('tt: ', trangthai);
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
                            trangthai,
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
    }, [trangthai, profile, currentPage]); // Thêm currentPage vào danh sách phụ thuộc

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage); // Cập nhật trang hiện tại
    };

    const handleOrderClick = (order) => {
        setSelectedOrder(order); // Cập nhật đơn hàng được chọn
        setIsModalVisible(true); // Hiển thị modal
    };

    const handleCloseModal = () => {
        setIsModalVisible(false); // Đóng modal
    };

    const handleStatusClick = (status) => {
        setTrangThai(status);
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await request.put(`/order/cancel/${orderId}`);
            if (response.status === 200) {
                // Refresh the order list after successful cancellation
                setItems(items.filter((item) => item.idHD !== orderId));
                setIsModalVisible(false);
                alert('Hủy đơn hàng thành công !');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('Đơn hàng không thể hủy, hãy liên hệ người bán để hỗ trợ');
            } else {
                console.error('Error canceling order:', error);
                alert('An error occurred while canceling the order');
            }
        }
    };

    if (!profile) {
        return null;
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
                        <Link to={'/'}>Đổi mật khẩu </Link>
                    </li>
                    <li className={cx('sidebar__menu-item')}>
                        <Link to={'/'}>Bảo mật</Link>
                    </li>
                </ul>
            </div>
            <div className={cx('content')}>
                <ul className={cx('navbar')}>
                    <li className={cx({ actived: trangthai === '0' })} onClick={() => handleStatusClick('')}>
                        Tất cả
                    </li>
                    <li className={cx({ actived: trangthai === '1' })} onClick={() => handleStatusClick('1')}>
                        Chờ xác nhận
                    </li>
                    <li className={cx({ actived: trangthai === '2' })} onClick={() => handleStatusClick('2')}>
                        Đang giao
                    </li>
                    <li className={cx({ actived: trangthai === '3' })} onClick={() => handleStatusClick('3')}>
                        Hoàn thành
                    </li>
                    <li className={cx({ actived: trangthai === '4' })} onClick={() => handleStatusClick('4')}>
                        Đã hủy
                    </li>
                </ul>
                {items.map((item) => (
                    <div key={item.idHD} className={cx('order')} onClick={() => handleOrderClick(item)}>
                        <div className={cx('')}>
                            <div className={cx('order__header')}>
                                <div className={cx('order__status')}>
                                    {item.trangthai === '1' && 'Chờ xác nhận'}
                                    {item.trangthai === '2' && 'Đang giao'}
                                    {item.trangthai === '3' && 'Hoàn thành'}
                                    {item.trangthai === '4' && 'Đã hủy'}
                                </div>
                            </div>
                            {item.details.map((detail) => (
                                <div key={detail.idCTHD} className={cx('order__item')}>
                                    <img
                                        src={`http://localhost:8080/img/products/${detail.hinhanh1}`}
                                        alt=""
                                        className={cx('order__item-img')}
                                    />
                                    <div className={cx('order__item-quantity')}>{detail.soLuong}</div>
                                    <div className={cx('order__item-details')}>
                                        <h3 className={cx('order__item-title')}>{detail.tenNH}</h3>
                                        <p className={cx('order__item-capacity')}>Dung tích: {detail.dungtich}</p>
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
                                        className={cx('ml-2')}
                                        value={item.tongtien}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' VND'}
                                    />
                                </div>
                                <div className={cx('order__actions')}></div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className={cx('row')}>
                    <div className={cx('col-lg-12')}>
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

            {/* Modal */}

            <DetailOrder
                order={selectedOrder}
                isVisible={isModalVisible}
                onCancelOrder={handleCancelOrder}
                onClose={handleCloseModal}
            />
        </div>
    );
}

export default Myorder;

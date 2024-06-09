import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import classNames from 'classnames/bind';

import request from '~/utils/request';
import styles from '../Admin.module.scss';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { FaCircleXmark } from 'react-icons/fa6';
import DetailOrder from '~/components/DetailOrder';

const cx = classNames.bind(styles);
function QLHD() {
    const navigator = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef();
    const [orders, setOrders] = useState([]);
    const [sortBy, setSortBy] = useState('ngaydat');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 7; // Số lượng mục trên mỗi trang
    const [selectedOrder, setSelectedOrder] = useState(null); // Trạng thái cho đơn hàng được chọn
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái cho modal

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let res;
                const params = {
                    sortBy,
                    sortOrder,
                    page: currentPage,
                    limit: 8,
                };

                if (searchValue === '') {
                    res = await request.get('order', { params });
                    setOrders(res.data.orders);
                    setTotalPages(res.data.totalPages);
                }
            } catch (error) {
                console.log('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [sortBy, searchValue, sortOrder, currentPage]);

    useEffect(() => {
        if (searchValue === '') {
            return;
        }
        const fetchSearchResults = async () => {
            try {
                const params = {
                    q: searchValue,
                    sortBy: 'tennhan',
                    sortOrder,
                    page: currentPage,
                    limit: itemsPerPage,
                };
                const res = await request.get('/order/search', { params });
                setOrders(res.data.results);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchSearchResults();
    }, [searchValue, sortOrder, currentPage]);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        setCurrentPage(1); // Đặt lại trang hiện tại về 1 khi thực hiện tìm kiếm mới
    };
    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
        setCurrentPage(1); // Đặt lại trang hiện tại về 1 khi xóa tìm kiếm
    };
    const handleSort = (field) => {
        setSortBy(field);
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };
    // const handleViewDetail = (id) => {
    //     // Chuyển hướng đến trang chi tiết hóa đơn và truyền id hóa đơn
    //     navigator(`/admin/detailhd/${id}`);
    // };

    const handleOrderClick = (item) => {
        setSelectedOrder(item); // Cập nhật đơn hàng được chọn
        setIsModalVisible(true); // Hiển thị modal
    };

    const handleCloseModal = () => {
        setIsModalVisible(false); // Đóng modal
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await request.put(`/order/cancel/${orderId}`);
            if (response.status === 200) {
                // Refresh the order list after successful cancellation
                setOrders(orders.filter((item) => item.idHD !== orderId));
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

    const handleUpdateOrder = (id) => {
        // Chuyển hướng đến trang chi tiết hóa đơn và truyền id hóa đơn
        navigator(`/admin/updateorder/${id}`);
    };
    const handleSoftDeleteItem = async (id) => {
        try {
            let text = 'Xóa hóa đơn ?';
            if (window.confirm(text) === true) {
                await request.put(`/order/${id}/delete`);
                // Sau khi xóa thành công, cập nhật lại danh sách khách hàng trong giỏ hàng
                const updatedCartItems = orders.filter((item) => item.idHD !== id);
                setOrders(updatedCartItems);
            } else {
                return; // Trả về khách hàng với số lượng = 1 nếu không xác nhận xóa
            }
        } catch (error) {
            console.log('error', error);
        }
    };
    // if (!selectedOrder) {
    //     return null;
    // }
    console.log(orders);
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card strpied-tabled-with-hover">
                        <div className={cx('card-header-table')}>
                            <h4 className={cx('card-title')}>Hóa đơn</h4>

                            <Link className={cx('card-link')} to={'/admin/trashorder'}>
                                Thùng rác
                            </Link>
                            <div className={cx('shop__sidebar__search')}>
                                <form action="#">
                                    <input
                                        id="shop-sidebar-search"
                                        autoComplete="off"
                                        placeholder="Search..."
                                        ref={inputRef}
                                        value={searchValue}
                                        spellCheck={false}
                                        onChange={handleSearchChange}
                                    />
                                    {!!searchValue && (
                                        <button className={cx('search__clear')} onClick={handleClear}>
                                            <FaCircleXmark />
                                        </button>
                                    )}{' '}
                                    <button
                                        className={cx('search__search')}
                                        onClick={(e) => {
                                            e.preventDefault(); // Ngăn chặn hành vi mặc định của nút
                                        }}
                                    >
                                        <IoSearch />
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="card-body table-full-width table-responsive">
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <button className={cx('sort-btn')} onClick={() => handleSort('tennhan')}>
                                                Người nhận{'  '}
                                                {sortBy === 'tennhan' && sortOrder === 'desc' ? (
                                                    <i className="fa-duotone fa-sort-down"></i>
                                                ) : sortBy === 'tennhan' && sortOrder === 'asc' ? (
                                                    <i className="fa-duotone fa-sort-up"></i>
                                                ) : (
                                                    <i className="fa-solid fa-sort"></i>
                                                )}
                                            </button>{' '}
                                        </th>
                                        <th className="col-1">
                                            <button className={cx('sort-btn')} onClick={() => handleSort('sdtnhan')}>
                                                SDT{' '}
                                                {sortBy === 'sdtnhan' && sortOrder === 'desc' ? (
                                                    <i className="fa-duotone fa-sort-down"></i>
                                                ) : sortBy === 'sdtnhan' && sortOrder === 'asc' ? (
                                                    <i className="fa-duotone fa-sort-up"></i>
                                                ) : (
                                                    <i className="fa-solid fa-sort"></i>
                                                )}
                                            </button>
                                        </th>
                                        <th className="col-2">
                                            <button className={cx('sort-btn')} onClick={() => handleSort('diachinhan')}>
                                                Địa chỉ nhận{'  '}
                                                {sortBy === 'diachinhan' && sortOrder === 'desc' ? (
                                                    <i className="fa-duotone fa-sort-down"></i>
                                                ) : sortBy === 'diachinhan' && sortOrder === 'asc' ? (
                                                    <i className="fa-duotone fa-sort-up"></i>
                                                ) : (
                                                    <i className="fa-solid fa-sort"></i>
                                                )}
                                            </button>
                                        </th>
                                        <th>
                                            <button className={cx('sort-btn')} onClick={() => handleSort('tongtien')}>
                                                Tổng tiền{'  '}
                                                {sortBy === 'tongtien' && sortOrder === 'desc' ? (
                                                    <i className="fa-duotone fa-sort-down"></i>
                                                ) : sortBy === 'tongtien' && sortOrder === 'asc' ? (
                                                    <i className="fa-duotone fa-sort-up"></i>
                                                ) : (
                                                    <i className="fa-solid fa-sort"></i>
                                                )}
                                            </button>
                                        </th>
                                        <th scope="col">
                                            <button className={cx('sort-btn')} onClick={() => handleSort('ngaydat')}>
                                                Ngày đặt{'  '}
                                                {sortBy === 'ngaydat' && sortOrder === 'desc' ? (
                                                    <i className="fa-duotone fa-sort-down"></i>
                                                ) : sortBy === 'ngaydat' && sortOrder === 'asc' ? (
                                                    <i className="fa-duotone fa-sort-up"></i>
                                                ) : (
                                                    <i className="fa-solid fa-sort"></i>
                                                )}
                                            </button>
                                        </th>
                                        <th className="col-2">
                                            <button className={cx('sort-btn')} onClick={() => handleSort('thanhtoan')}>
                                                Thanh toán{'  '}
                                                {sortBy === 'thanhtoan' && sortOrder === 'desc' ? (
                                                    <i className="fa-duotone fa-sort-down"></i>
                                                ) : sortBy === 'thanhtoan' && sortOrder === 'asc' ? (
                                                    <i className="fa-duotone fa-sort-up"></i>
                                                ) : (
                                                    <i className="fa-solid fa-sort"></i>
                                                )}
                                            </button>
                                        </th>
                                        <th>
                                            <button className={cx('sort-btn')} onClick={() => handleSort('trangthai')}>
                                                Trạng thái{'  '}
                                                {sortBy === 'trangthai' && sortOrder === 'desc' ? (
                                                    <i className="fa-duotone fa-sort-down"></i>
                                                ) : sortBy === 'trangthai' && sortOrder === 'asc' ? (
                                                    <i className="fa-duotone fa-sort-up"></i>
                                                ) : (
                                                    <i className="fa-solid fa-sort"></i>
                                                )}
                                            </button>
                                        </th>
                                        <th className="col-1">Tùy chọn </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.idHD}>
                                            <td onClick={() => handleOrderClick(order)}>{order.tennhan}</td>
                                            <td onClick={() => handleOrderClick(order)}>{order.sdtnhan}</td>
                                            <td onClick={() => handleOrderClick(order)}>{order.diachinhan}</td>
                                            <td onClick={() => handleOrderClick(order)}>
                                                <CurrencyFormat
                                                    value={order.tongtien}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                />
                                            </td>
                                            <td onClick={() => handleOrderClick(order)}>
                                                {moment(order.ngaydat).format('HH:mm:ss DD/MM/YYYY')}
                                            </td>
                                            <td onClick={() => handleOrderClick(order)}>
                                                {order.thanhtoan === 'cod' && 'Thanh toán khi nhận hàng'}
                                                {order.thanhtoan === 'banking' && 'Chuyển khoản ngân hàng'}
                                            </td>
                                            <td onClick={() => handleOrderClick(order)}>
                                                {order.trangthai === '1' && 'Chờ xác nhận'}
                                                {order.trangthai === '2' && 'Đang giao'}
                                                {order.trangthai === '3' && 'Hoàn thành'}
                                                {order.trangthai === '4' && 'Đã hủy'}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleUpdateOrder(order.idHD);
                                                    }}
                                                    className={cx('table-btn', '')}
                                                >
                                                    <FaRegEdit />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleSoftDeleteItem(order.idHD);
                                                    }}
                                                    className={cx('table-btn', '')}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <div className={cx('product__pagination')}>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <Link
                                            key={index}
                                            className={cx({ active: index + 1 === currentPage })}
                                            to="#"
                                            onClick={() => handlePageClick(index + 1)}
                                        >
                                            {index + 1}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <DetailOrder
                            order={selectedOrder}
                            isVisible={isModalVisible}
                            onCancelOrder={handleCancelOrder}
                            onClose={handleCloseModal}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default QLHD;

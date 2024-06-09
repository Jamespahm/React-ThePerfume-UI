import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';

import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';

const cx = classNames.bind(styles);

function TrashOrder() {
    const [sortBy, setSortBy] = useState('');
    const [orders, setOrder] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 7; // Số lượng mục trên mỗi trang
    const navigator = useNavigate();
    useEffect(() => {
        const fetchTrashOrders = async () => {
            try {
                const params = {
                    sortBy,
                    sortOrder,
                    page: currentPage,
                    limit: itemsPerPage,
                };
                const res = await request.get('/order/trash', { params });
                setOrder(res.data.results);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchTrashOrders();
    }, [sortBy, sortOrder, currentPage]);

    const handleSort = (field) => {
        setSortBy(field);
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleForceDeleteItem = async (id) => {
        try {
            let text = 'Xóa hóa đơn ?';
            if (window.confirm(text) === true) {
                await request.delete(`/order/${id}/deletef`);
                // Sau khi xóa thành công, cập nhật lại danh sách hóa đơn trong giỏ hàng
                const updatedCartItems = orders.filter((item) => item.idHD !== id);
                setOrder(updatedCartItems);
            } else {
                return; // Trả về hóa đơn với số lượng = 1 nếu không xác nhận xóa
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleRestoreItem = async (id) => {
        try {
            let text = 'Khôi phục hóa đơn ?';
            if (window.confirm(text) === true) {
                await request.put(`/order/${id}/restore`);
                // Sau khi xóa thành công, cập nhật lại danh sách hóa đơn trong giỏ hàng
                const updatedCartItems = orders.filter((item) => item.idHD !== id);
                setOrder(updatedCartItems);
            } else {
                return; // Trả về hóa đơn với số lượng = 1 nếu không xác nhận xóa
            }
        } catch (error) {
            console.log('error', error);
        }
    };
    const handleViewDetail = (orderId) => {
        // Chuyển hướng đến trang chi tiết hóa đơn và truyền id hóa đơn
        navigator(`/admin/detailhd/${orderId}`);
    };

    console.log('page: ', totalPages);

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card strpied-tabled-with-hover">
                        <div className={cx('card-header-table')}>
                            <h4 className={cx('card-title')}>Hóa đơn đã xóa</h4>
                            <Link className={cx('card-link')} to={'/admin/qlhd'}>
                                Tất cả hóa đơn
                            </Link>
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
                                                Trạng thái
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
                                    {orders.map((order, index) => (
                                        <tr key={order.idHD}>
                                            <td onClick={() => handleViewDetail(order.idHD)}>{order.tennhan}</td>
                                            <td onClick={() => handleViewDetail(order.idHD)}>{order.sdtnhan}</td>
                                            <td onClick={() => handleViewDetail(order.idHD)}>{order.diachinhan}</td>
                                            <td onClick={() => handleViewDetail(order.idHD)}>
                                                <CurrencyFormat
                                                    value={order.tongtien}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={''}
                                                />
                                            </td>
                                            <td onClick={() => handleViewDetail(order.idHD)}>
                                                {moment(order.ngaydat).format('HH:mm:ss DD/MM/YYYY')}
                                            </td>
                                            <td onClick={() => handleViewDetail(order.idHD)}>
                                                {order.thanhtoan === 'cod' && 'Thanh toán khi nhận hàng'}
                                                {order.thanhtoan === 'banking' && 'Chuyển khoản ngân hàng'}
                                            </td>
                                            <td>
                                                {order.trangthai === '1' && 'Chờ xác nhận'}
                                                {order.trangthai === '2' && 'Đang giao'}
                                                {order.trangthai === '3' && 'Hoàn thành'}
                                                {order.trangthai === '4' && 'Đã hủy'}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleRestoreItem(order.idHD)}
                                                    className={cx('table-btn', '')}
                                                >
                                                    <FaRegEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleForceDeleteItem(order.idHD)}
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default TrashOrder;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';

import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';
import { FaSortDown, FaSortUp, FaRegEdit, FaTrashAlt } from 'react-icons/fa';

const cx = classNames.bind(styles);

function TrashOrder() {
    const [orders, setOrder] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 7; // Số lượng mục trên mỗi trang

    useEffect(() => {
        const fetchTrashOrders = async () => {
            try {
                const params = {
                    sortBy: 'tennhan',
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
    }, [sortOrder, currentPage]);

    const handleSortButtonClick = () => {
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
                                        <th scope="col">Người nhận </th>
                                        <th scope="col">SDT nhận</th>
                                        <th scope="col">Địa chỉ nhận</th>
                                        <th scope="col">Tổng tiền</th>
                                        <th scope="col">
                                            Ngày đặt
                                            <button onClick={handleSortButtonClick}>
                                                {sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}
                                            </button>
                                        </th>
                                        <th scope="col">Thanh toán</th>
                                        <th scope="col">Trạng thái</th>
                                        <th>Tùy chọn </th>
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
                                            <td onClick={() => handleViewDetail(order.idHD)}>{order.thanhtoan}</td>
                                            <td>{order.trangthai}</td>
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

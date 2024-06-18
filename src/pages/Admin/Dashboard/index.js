import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import request from '~/utils/request';
import './Dashboard.css';
import classNames from 'classnames/bind';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';

import styles from '../Admin.module.scss';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import DetailOrder from '~/components/DetailOrder';

const cx = classNames.bind(styles);

function Dashboard() {
    const [timeRev, setTimeRev] = useState(2024);
    const [timePer, setTimePer] = useState(2024);
    const [revenue, setRevenue] = useState([]);
    const [perfumeRevenue, setPerfumeRevenue] = useState([]);

    const [orders, setOrders] = useState([]);
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [sortBy, setSortBy] = useState('ngaydat');
    const [sortOrder, setSortOrder] = useState('desc');
    const [dt, setDt] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5; // Số lượng mục trên mỗi trang
    const [selectedOrder, setSelectedOrder] = useState(null); // Trạng thái cho đơn hàng được chọn
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái cho modal

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const res = await request.get(`/statistic/revenue/${timeRev}`);
                // Chuyển đổi dữ liệu doanh thu thành phần trăm
                const convertedRevenue = res.data.map((rev) => ({
                    month: rev.month,
                    totalRevenue: rev.totalRevenue,
                    // Tính toán phần trăm doanh thu so với mốc 500,000,000 VNĐ
                    totalRev: (rev.totalRevenue / 500000000) * 100,
                }));
                setRevenue(convertedRevenue);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchRevenue();
    }, [timeRev]);

    useEffect(() => {
        const fetchPerfumeRevenue = async () => {
            try {
                const res = await request.get(`/statistic/perfumerevenue/${timePer}`);
                // Chuyển đổi dữ liệu doanh thu thành phần trăm
                const convertedRevenue = res.data.map((rev) => ({
                    month: rev.month,
                    totalPerfumeRevenue: rev.totalPerfumeRevenue,
                    // Tính toán phần trăm doanh thu so với mốc 500,000,000 VNĐ
                    totalPerfumeRev: (rev.totalPerfumeRevenue / 100) * 100,
                }));
                setPerfumeRevenue(convertedRevenue);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchPerfumeRevenue();
    }, [timePer]);

    const handleChangeRev = (event) => {
        setTimeRev(event.target.value);
    };
    const handleChangePer = (event) => {
        setTimePer(event.target.value);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let res;
                const params = {
                    sortBy,
                    sortOrder,
                    page: currentPage,
                    limit: itemsPerPage,
                };
                res = await request.get(`/statistic/orders/${month}/${year}`, { params });
                setOrders(res.data.orders);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.log('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [sortBy, sortOrder, currentPage, itemsPerPage, month, year]);

    const handleSort = (field) => {
        setSortBy(field);
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };
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
    const handleColumnRev = (revMonth, dt) => {
        setMonth(revMonth);
        setYear(timeRev);
        setDt(dt);
    };

    console.log(orders);
    return (
        <>
            <div className="row mt-2 mb-5">
                <div className="col-6">
                    <div className="card-chart">
                        <div className="chart yellow">
                            {revenue.map((rev, index) => (
                                <div className="column-container" key={index}>
                                    <div className="column-name">T{rev.month}</div>
                                    <div className="column">
                                        <div
                                            className="column-main"
                                            style={{ height: `${rev.totalRev}%` }}
                                            onClick={() => handleColumnRev(rev.month, rev.totalRevenue)}
                                        >
                                            <span className="column-rev">{rev.totalRev.toFixed(0)}%</span>
                                            <span className="column-revenue">
                                                <CurrencyFormat
                                                    value={rev.totalRevenue}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={''}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="info">
                            <span>Doanh thu nước hoa bán ra năm </span>
                            <select name="time" value={timeRev} onChange={handleChangeRev}>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="col-6">
                    <div className="card-chart">
                        <div className="chart blue">
                            {perfumeRevenue.map((rev, index) => (
                                <div className="column-container" key={index}>
                                    <div className="column-name">T{rev.month}</div>
                                    <div className="column">
                                        <div className="column-main" style={{ height: `${rev.totalPerfumeRevenue}%` }}>
                                            <span className="column-rev">{rev.totalPerfumeRev.toFixed(0)}%</span>
                                            <span className="column-revenue">{rev.totalPerfumeRevenue}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="info">
                            <span>Doanh số nước hoa bán ra năm </span>
                            <select name="time" value={timePer} onChange={handleChangePer}>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card strpied-tabled-with-hover">
                <div className={cx('card-header-table')}>
                    <h5 className={cx('card-title')}>
                        Hóa đơn tháng {month}/{year} {'-'} Doanh thu:{' '}
                        <CurrencyFormat value={dt} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                    </h5>
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
                            {orders.length > 0 ? (
                                orders.map((order) => (
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
                                                    // handleUpdateOrder(order.idHD);
                                                }}
                                                className={cx('table-btn', '')}
                                            >
                                                <FaRegEdit />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    // handleSoftDeleteItem(order.idHD);
                                                }}
                                                className={cx('table-btn', '')}
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                </tr>
                            )}
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
            {/* )} */}
        </>
    );
}

export default Dashboard;

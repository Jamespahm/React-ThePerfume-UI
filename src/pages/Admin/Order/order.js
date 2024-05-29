import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import classNames from 'classnames/bind';

import request from '~/utils/request';
import styles from '../Admin.module.scss';
import { FaSortDown, FaSortUp, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { FaCircleXmark } from 'react-icons/fa6';

const cx = classNames.bind(styles);
function QLHD() {
    const navigator = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef();
    const [orders, setOrders] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 7; // Số lượng mục trên mỗi trang

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let res;
                const params = {
                    sortBy: 'tennhan',
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
    }, [searchValue, sortOrder, currentPage]);

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
    const handleSortButtonClick = () => {
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };
    const handleViewDetail = (id) => {
        // Chuyển hướng đến trang chi tiết hóa đơn và truyền id hóa đơn
        navigator(`/admin/detailhd/${id}`);
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
    console.log(orders);
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card strpied-tabled-with-hover">
                        <div className={cx('card-header-table')}>
                            <h4 className={cx('card-title')}>Hóa đơn</h4>
                            <Link className={cx('card-link')} to={'/admin/createorder'}>
                                Thêm mới
                            </Link>
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
                                            <td onClick={() => handleViewDetail(order.idHD)}>{order.trangthai}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleUpdateOrder(order.idHD)}
                                                    className={cx('table-btn', '')}
                                                >
                                                    <FaRegEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleSoftDeleteItem(order.idHD)}
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

export default QLHD;

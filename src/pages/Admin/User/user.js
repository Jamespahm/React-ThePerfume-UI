import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { FaCircleXmark } from 'react-icons/fa6';

const cx = classNames.bind(styles);

function QLKH() {
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef();
    const [users, setUser] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 7; // Số lượng mục trên mỗi trang
    const navigator = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const params = {
                    sortBy,
                    sortOrder,
                    page: currentPage,
                    limit: itemsPerPage,
                };
                if (searchValue === '') {
                    const res = await request.get('/user', { params });
                    setUser(res.data.users);
                    setTotalPages(res.data.totalPages);
                }
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchUsers();
    }, [sortBy, sortOrder, currentPage, searchValue]);

    useEffect(() => {
        if (searchValue === '') {
            return;
        }
        const fetchSearchResults = async () => {
            try {
                const params = {
                    q: searchValue,
                    sortBy,
                    sortOrder,
                    page: currentPage,
                    limit: itemsPerPage,
                };
                const res = await request.get('/user/search', { params });
                setUser(res.data.users);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchSearchResults();
    }, [sortBy, searchValue, sortOrder, currentPage]);

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

    const handleSoftDeleteItem = async (id) => {
        try {
            let text = 'Xóa khách hàng ?';
            if (window.confirm(text) === true) {
                await request.put(`/user/${id}/delete`);
                // Sau khi xóa thành công, cập nhật lại danh sách khách hàng trong giỏ hàng
                const updatedCartItems = users.filter((item) => item.idKH !== id);
                setUser(updatedCartItems);
            } else {
                return; // Trả về khách hàng với số lượng = 1 nếu không xác nhận xóa
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleUpdateUser = (id) => {
        // Chuyển hướng đến trang chi tiết hóa đơn và truyền id hóa đơn
        navigator(`/admin/updateuser/${id}`);
    };

    console.log('page: ', totalPages);
    console.log('users: ', users);

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card strpied-tabled-with-hover">
                        <div className={cx('card-header-table')}>
                            <h4 className={cx('card-title')}>Khách hàng</h4>
                            <Link className={cx('card-link')} to={'/admin/createuser'}>
                                Thêm mới
                            </Link>
                            <Link className={cx('card-link')} to={'/admin/trashuser'}>
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
                                        <th className="col-1">Hình ảnh</th>
                                        <th scope="col">
                                            <button className={cx('sort-btn')} onClick={() => handleSort('tenKH')}>
                                                Tên khách hàng{'  '}
                                                {sortBy === 'tenKH' && sortOrder === 'desc' ? (
                                                    <i className="fa-duotone fa-sort-down"></i>
                                                ) : sortBy === 'tenKH' && sortOrder === 'asc' ? (
                                                    <i className="fa-duotone fa-sort-up"></i>
                                                ) : (
                                                    <i className="fa-solid fa-sort"></i>
                                                )}
                                            </button>
                                        </th>
                                        <th>
                                            <button className={cx('sort-btn')} onClick={() => handleSort('gioitinh')}>
                                                Giới tính{' '}
                                                {sortBy === 'gioitinh' && sortOrder === 'desc' ? (
                                                    <i className="fa-duotone fa-sort-down"></i>
                                                ) : sortBy === 'gioitinh' && sortOrder === 'asc' ? (
                                                    <i className="fa-duotone fa-sort-up"></i>
                                                ) : (
                                                    <i className="fa-solid fa-sort"></i>
                                                )}
                                            </button>
                                        </th>
                                        <th>
                                            <button className={cx('sort-btn')} onClick={() => handleSort('tenDN')}>
                                                Tên đăng nhập{' '}
                                                {sortBy === 'tenDN' && sortOrder === 'desc' ? (
                                                    <i className="fa-duotone fa-sort-down"></i>
                                                ) : sortBy === 'tenDN' && sortOrder === 'asc' ? (
                                                    <i className="fa-duotone fa-sort-up"></i>
                                                ) : (
                                                    <i className="fa-solid fa-sort"></i>
                                                )}
                                            </button>
                                        </th>
                                        <th>
                                            <button className={cx('sort-btn')} onClick={() => handleSort('sdt')}>
                                                Số điện thoại{' '}
                                                {sortBy === 'sdt' && sortOrder === 'desc' ? (
                                                    <i className="fa-duotone fa-sort-down"></i>
                                                ) : sortBy === 'sdt' && sortOrder === 'asc' ? (
                                                    <i className="fa-duotone fa-sort-up"></i>
                                                ) : (
                                                    <i className="fa-solid fa-sort"></i>
                                                )}
                                            </button>
                                        </th>
                                        <th>
                                            <button className={cx('sort-btn')} onClick={() => handleSort('email')}>
                                                Email{' '}
                                                {sortBy === 'email' && sortOrder === 'desc' ? (
                                                    <i className="fa-duotone fa-sort-down"></i>
                                                ) : sortBy === 'email' && sortOrder === 'asc' ? (
                                                    <i className="fa-duotone fa-sort-up"></i>
                                                ) : (
                                                    <i className="fa-solid fa-sort"></i>
                                                )}
                                            </button>
                                        </th>
                                        <th scope="col">Mật khẩu</th>
                                        <th scope="col">Tùy chọn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.idKH}>
                                            <td>
                                                <img src={`http://localhost:8080/img/user-avt/${user.avatar}`} alt="" />
                                            </td>
                                            <td>{user.tenKH}</td>
                                            <td>{user.gioitinh}</td>
                                            <td>{user.tenDN}</td>
                                            <td>{user.sdt}</td>
                                            <td>{user.email}</td>
                                            <td>{user.matkhau}</td>
                                            <td>
                                                {/* <button className={cx('table-btn', '')}>
                                                    <FaEye />
                                                </button> */}
                                                <button
                                                    onClick={() => handleUpdateUser(user.idKH)}
                                                    className={cx('table-btn', '')}
                                                >
                                                    <FaRegEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleSoftDeleteItem(user.idKH)}
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

export default QLKH;

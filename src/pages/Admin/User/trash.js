import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';

const cx = classNames.bind(styles);

function TrashUser() {
    const [user, setUser] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 7; // Số lượng mục trên mỗi trang

    useEffect(() => {
        const fetchTrashUsers = async () => {
            try {
                const params = {
                    sortBy,
                    sortOrder,
                    page: currentPage,
                    limit: itemsPerPage,
                };
                const res = await request.get('/user/trash', { params });
                setUser(res.data);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchTrashUsers();
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
            let text = 'Xóa khách hàng ?';
            if (window.confirm(text) === true) {
                await request.delete(`/user/${id}/deletef`);
                // Sau khi xóa thành công, cập nhật lại danh sách khách hàng trong giỏ hàng
                const updatedCartItems = user.filter((item) => item.idKH !== id);
                setUser(updatedCartItems);
            } else {
                return; // Trả về khách hàng với số lượng = 1 nếu không xác nhận xóa
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleRestoreItem = async (id) => {
        try {
            let text = 'Khôi phục khách hàng ?';
            if (window.confirm(text) === true) {
                await request.put(`/user/${id}/restore`);
                // Sau khi xóa thành công, cập nhật lại danh sách khách hàng trong giỏ hàng
                const updatedCartItems = user.filter((item) => item.idKH !== id);
                setUser(updatedCartItems);
            } else {
                return; // Trả về khách hàng với số lượng = 1 nếu không xác nhận xóa
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    console.log('page: ', totalPages);

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card strpied-tabled-with-hover">
                        <div className={cx('card-header-table')}>
                            <h4 className={cx('card-title')}>Khách hàng đã xóa</h4>
                            <Link className={cx('card-link')} to={'/admin/qlkh'}>
                                Tất cả khách hàng
                            </Link>
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
                                    {user.map((user, index) => (
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
                                                <button
                                                    onClick={() => handleForceDeleteItem(user.idKH)}
                                                    className={cx('table-btn', '')}
                                                >
                                                    <FaTrashAlt />
                                                </button>

                                                <button
                                                    onClick={() => handleRestoreItem(user.idKH)}
                                                    className={cx('table-btn', '')}
                                                >
                                                    <FaRegEdit />
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

export default TrashUser;

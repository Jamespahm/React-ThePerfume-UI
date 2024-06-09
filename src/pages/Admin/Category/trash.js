import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';

const cx = classNames.bind(styles);

function TrashCategory() {
    const [category, setCategory] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 7; // Số lượng mục trên mỗi trang

    useEffect(() => {
        const fetchTrashCategories = async () => {
            try {
                const params = {
                    sortBy,
                    sortOrder,
                    page: currentPage,
                    limit: itemsPerPage,
                };
                const res = await request.get('/category/trash', { params });
                setCategory(res.data);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchTrashCategories();
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
            let text = 'Xóa loại nước hoa ?';
            if (window.confirm(text) === true) {
                await request.delete(`/category/${id}/deletef`);
                // Sau khi xóa thành công, cập nhật lại danh sách loại nước hoa trong giỏ hàng
                const updatedCartItems = category.filter((item) => item.idL !== id);
                setCategory(updatedCartItems);
            } else {
                return; // Trả về loại nước hoa với số lượng = 1 nếu không xác nhận xóa
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleRestoreItem = async (id) => {
        try {
            let text = 'Khôi phục loại nước hoa ?';
            if (window.confirm(text) === true) {
                await request.put(`/category/${id}/restore`);
                // Sau khi xóa thành công, cập nhật lại danh sách loại nước hoa trong giỏ hàng
                const updatedCartItems = category.filter((item) => item.idL !== id);
                setCategory(updatedCartItems);
            } else {
                return; // Trả về loại nước hoa với số lượng = 1 nếu không xác nhận xóa
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
                            <h4 className={cx('card-title')}>Loại nước đã xóa</h4>
                            <Link className={cx('card-link')} to={'/admin/qll'}>
                                Tất cả loại nước hoa
                            </Link>
                        </div>

                        <div className="card-body table-full-width table-responsive">
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th className="col-3">Hình ảnh</th>
                                        <th scope="col">
                                            <button className={cx('sort-btn')} onClick={() => handleSort('tenL')}>
                                                Tên loại nước hoa{'  '}
                                                {sortBy === 'tenL' && sortOrder === 'desc' ? (
                                                    <i className="fa-duotone fa-sort-down"></i>
                                                ) : sortBy === 'tenL' && sortOrder === 'asc' ? (
                                                    <i className="fa-duotone fa-sort-up"></i>
                                                ) : (
                                                    <i className="fa-solid fa-sort"></i>
                                                )}
                                            </button>
                                        </th>

                                        <th scope="col">Tùy chọn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.map((category, index) => (
                                        <tr key={category.idL}>
                                            <td>
                                                <img
                                                    src={`http://localhost:8080/img/category/${category.hinhanh}`}
                                                    alt=""
                                                />
                                            </td>
                                            <td>{category.tenL}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleForceDeleteItem(category.idL)}
                                                    className={cx('table-btn', '')}
                                                >
                                                    <FaTrashAlt />
                                                </button>

                                                <button
                                                    onClick={() => handleRestoreItem(category.idL)}
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

export default TrashCategory;

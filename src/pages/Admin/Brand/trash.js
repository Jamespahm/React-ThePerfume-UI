import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';

const cx = classNames.bind(styles);

function TrashBrand() {
    const [brand, setBrand] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 7; // Số lượng mục trên mỗi trang

    useEffect(() => {
        const fetchTrashBrands = async () => {
            try {
                const params = {
                    sortBy,
                    sortOrder,
                    page: currentPage,
                    limit: itemsPerPage,
                };
                const res = await request.get('/brand/trash', { params });
                setBrand(res.data);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchTrashBrands();
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
            let text = 'Xóa thương hiệu ?';
            if (window.confirm(text) === true) {
                await request.delete(`/brand/${id}/deletef`);
                // Sau khi xóa thành công, cập nhật lại danh sách thương hiệu trong giỏ hàng
                const updatedCartItems = brand.filter((item) => item.idTH !== id);
                setBrand(updatedCartItems);
            } else {
                return; // Trả về thương hiệu với số lượng = 1 nếu không xác nhận xóa
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleRestoreItem = async (id) => {
        try {
            let text = 'Khôi phục thương hiệu ?';
            if (window.confirm(text) === true) {
                await request.put(`/brand/${id}/restore`);
                // Sau khi xóa thành công, cập nhật lại danh sách thương hiệu trong giỏ hàng
                const updatedCartItems = brand.filter((item) => item.idTH !== id);
                setBrand(updatedCartItems);
            } else {
                return; // Trả về thương hiệu với số lượng = 1 nếu không xác nhận xóa
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
                            <h4 className={cx('card-title')}>Thương hiệu đã xóa</h4>
                            <Link className={cx('card-link')} to={'/admin/qlth'}>
                                Tất cả thương hiệu
                            </Link>
                        </div>

                        <div className="card-body table-full-width table-responsive">
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th className="col-3">Hình ảnh</th>
                                        <th scope="col">
                                            <button className={cx('sort-btn')} onClick={() => handleSort('tenTH')}>
                                                Tên thương hiệu{'  '}
                                                {sortBy === 'tenTH' && sortOrder === 'desc' ? (
                                                    <i className="fa-duotone fa-sort-down"></i>
                                                ) : sortBy === 'tenTH' && sortOrder === 'asc' ? (
                                                    <i className="fa-duotone fa-sort-up"></i>
                                                ) : (
                                                    <i className="fa-solid fa-sort"></i>
                                                )}
                                            </button>
                                        </th>

                                        <th>
                                            <button className={cx('sort-btn')} onClick={() => handleSort('xuatxu')}>
                                                Xuất xứ{' '}
                                                {sortBy === 'xuatxu' && sortOrder === 'desc' ? (
                                                    <i className="fa-duotone fa-sort-down"></i>
                                                ) : sortBy === 'xuatxu' && sortOrder === 'asc' ? (
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
                                    {brand.map((brand, index) => (
                                        <tr key={brand.idTH}>
                                            <td>
                                                <img src={`http://localhost:8080/img/banner/${brand.hinhanh}`} alt="" />
                                            </td>
                                            <td>{brand.tenTH}</td>
                                            <td>{brand.xuatxu}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleForceDeleteItem(brand.idTH)}
                                                    className={cx('table-btn', '')}
                                                >
                                                    <FaTrashAlt />
                                                </button>

                                                <button
                                                    onClick={() => handleRestoreItem(brand.idTH)}
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

export default TrashBrand;

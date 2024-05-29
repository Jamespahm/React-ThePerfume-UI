import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';
import { FaSortDown, FaSortUp, FaRegEdit, FaTrashAlt } from 'react-icons/fa';

const cx = classNames.bind(styles);

function TrashPerfume() {
    const [perfumes, setPerfume] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 7; // Số lượng mục trên mỗi trang

    useEffect(() => {
        const fetchTrashPerfumes = async () => {
            try {
                const params = {
                    sortBy: 'tenNH',
                    sortOrder,
                    page: currentPage,
                    limit: itemsPerPage,
                };
                const res = await request.get('/perfume/trash', { params });
                setPerfume(res.data.products);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchTrashPerfumes();
    }, [sortOrder, currentPage]);

    const handleSortButtonClick = () => {
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleForceDeleteItem = async (id) => {
        try {
            let text = 'Xóa sản phẩm ?';
            if (window.confirm(text) === true) {
                await request.delete(`/perfume/${id}/deletef`);
                // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm trong giỏ hàng
                const updatedCartItems = perfumes.filter((item) => item.idNH !== id);
                setPerfume(updatedCartItems);
            } else {
                return; // Trả về sản phẩm với số lượng = 1 nếu không xác nhận xóa
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleRestoreItem = async (id) => {
        try {
            let text = 'Khôi phục sản phẩm ?';
            if (window.confirm(text) === true) {
                await request.put(`/perfume/${id}/restore`);
                // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm trong giỏ hàng
                const updatedCartItems = perfumes.filter((item) => item.idNH !== id);
                setPerfume(updatedCartItems);
            } else {
                return; // Trả về sản phẩm với số lượng = 1 nếu không xác nhận xóa
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
                            <h4 className={cx('card-title')}>Nước hoa đã xóa</h4>
                            <Link className={cx('card-link')} to={'/admin/qlsp'}>
                                Tất cả nước hoa
                            </Link>
                        </div>

                        <div className="card-body table-full-width table-responsive">
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Hình ảnh</th>
                                        <th scope="col">
                                            Tên nước hoa
                                            <button className={cx('sort-btn')} onClick={handleSortButtonClick}>
                                                {sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}
                                            </button>
                                        </th>
                                        <th scope="col">Giá bán</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Tùy chọn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {perfumes.map((perfume, index) => (
                                        <tr key={perfume.idNH}>
                                            <td>
                                                <img
                                                    src={`http://localhost:8080/img/products/${perfume.hinhanh1}`}
                                                    alt=""
                                                />
                                            </td>
                                            <td>{perfume.tenNH}</td>
                                            <td>
                                                <CurrencyFormat
                                                    value={perfume.giaban}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={' VND'}
                                                />
                                            </td>
                                            <td>{perfume.soluong}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleForceDeleteItem(perfume.idNH)}
                                                    className={cx('table-btn', '')}
                                                >
                                                    <FaTrashAlt />
                                                </button>

                                                <button
                                                    onClick={() => handleRestoreItem(perfume.idNH)}
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

export default TrashPerfume;

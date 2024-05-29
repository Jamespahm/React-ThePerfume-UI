import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';
import { FaSortDown, FaSortUp, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { FaCircleXmark } from 'react-icons/fa6';

const cx = classNames.bind(styles);

function QLSP() {
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef();
    const [perfumes, setPerfume] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 7; // Số lượng mục trên mỗi trang
    const navigator = useNavigate();

    useEffect(() => {
        const fetchPerfumes = async () => {
            try {
                const params = {
                    sortBy: 'tenNH',
                    sortOrder,
                    page: currentPage,
                    limit: itemsPerPage,
                };
                if (searchValue === '') {
                    const res = await request.get('/perfume', { params });
                    setPerfume(res.data.products);
                    setTotalPages(res.data.totalPages);
                }
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchPerfumes();
    }, [sortOrder, currentPage, searchValue]);

    useEffect(() => {
        if (searchValue === '') {
            return;
        }
        const fetchSearchResults = async () => {
            try {
                const params = {
                    q: searchValue,
                    sortBy: 'tenNH',
                    sortOrder,
                    page: currentPage,
                    limit: itemsPerPage,
                };
                const res = await request.get('/perfume/search', { params });
                setPerfume(res.data.products);
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

    const handleSoftDeleteItem = async (id) => {
        try {
            let text = 'Xóa sản phẩm ?';
            if (window.confirm(text) === true) {
                await request.put(`/perfume/${id}/delete`);
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
    const handleUpdatePerfume = (id) => {
        // Chuyển hướng đến trang chi tiết hóa đơn và truyền id hóa đơn
        navigator(`/admin/updateperfume/${id}`);
    };
    console.log('page: ', totalPages);

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card strpied-tabled-with-hover">
                        <div className={cx('card-header-table')}>
                            <h4 className={cx('card-title')}>Nước hoa</h4>
                            <Link className={cx('card-link')} to={'/admin/createperfume'}>
                                Thêm mới
                            </Link>
                            <Link className={cx('card-link')} to={'/admin/trashperfume'}>
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
                                                {/* <button className={cx('table-btn', '')}>
                                                    <FaEye />
                                                </button> */}
                                                <button
                                                    onClick={() => handleUpdatePerfume(perfume.idNH)}
                                                    className={cx('table-btn', '')}
                                                >
                                                    <FaRegEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleSoftDeleteItem(perfume.idNH)}
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

export default QLSP;

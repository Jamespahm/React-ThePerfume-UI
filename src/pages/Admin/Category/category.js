import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { FaCircleXmark } from 'react-icons/fa6';

const cx = classNames.bind(styles);

function QLL() {
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef();
    const [categories, setCategory] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 7; // Số lượng mục trên mỗi trang
    const navigator = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const params = {
                    sortBy,
                    sortOrder,
                    page: currentPage,
                    limit: itemsPerPage,
                };
                if (searchValue === '') {
                    const res = await request.get('/category', { params });
                    setCategory(res.data.categories);
                    setTotalPages(res.data.totalPages);
                }
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchCategories();
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
                const res = await request.get('/category/search', { params });
                setCategory(res.data.categories);
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
            let text = 'Xóa loại nước hoa ?';
            if (window.confirm(text) === true) {
                await request.put(`/category/${id}/delete`);
                // Sau khi xóa thành công, cập nhật lại danh sách loại nước hoa trong giỏ hàng
                const updatedCartItems = categories.filter((item) => item.idL !== id);
                setCategory(updatedCartItems);
            } else {
                return; // Trả về loại nước hoa với số lượng = 1 nếu không xác nhận xóa
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleUpdateCategory = (id) => {
        // Chuyển hướng đến trang chi tiết hóa đơn và truyền id hóa đơn
        navigator(`/admin/updatecategory/${id}`);
    };

    console.log('page: ', totalPages);
    console.log('categories: ', categories);

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card strpied-tabled-with-hover">
                        <div className={cx('card-header-table')}>
                            <h4 className={cx('card-title')}>Loại nước hoa</h4>
                            <Link className={cx('card-link')} to={'/admin/createcategory'}>
                                Thêm mới
                            </Link>
                            <Link className={cx('card-link')} to={'/admin/trashcategory'}>
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
                                    {categories.map((category) => (
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
                                                    onClick={() => handleUpdateCategory(category.idL)}
                                                    className={cx('table-btn', '')}
                                                >
                                                    <FaRegEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleSoftDeleteItem(category.idL)}
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

export default QLL;

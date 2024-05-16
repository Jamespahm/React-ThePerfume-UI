import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';

import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
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

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                let res;
                const params = {
                    sortBy: 'tenNH',
                    sortOrder,
                    page: currentPage,
                    limit: 8,
                };
                if (searchValue !== '') {
                    params.q = searchValue;
                }
                res = await request.get('perfume', { params });
                setPerfume(res.data.products);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchAPI();
    }, [searchValue, sortOrder, currentPage]);

    const handleSortButtonClick = () => {
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card strpied-tabled-with-hover">
                        <div className={cx('card-header-table')}>
                            <h4 className="card-title">Striped Table with Hover</h4>
                        </div>

                        <div className="card-body table-full-width table-responsive">
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">
                                            Tên nước hoa
                                            <button onClick={handleSortButtonClick}>
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
                                            <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
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
                                            <td>xóa</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QLSP;

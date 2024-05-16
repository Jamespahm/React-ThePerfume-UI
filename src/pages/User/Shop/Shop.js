import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { IoSearch, IoChevronDownSharp, IoChevronForwardSharp } from 'react-icons/io5';
import { FaCircleXmark } from 'react-icons/fa6';

import request from '~/utils/request';
import styles from './Shop.module.scss';
import config from '~/config/userRoutes';
import ProductItem from '~/components/ProductItem/ProductItem';

const cx = classNames.bind(styles);

function Shop() {
    const [searchValue, setSearchValue] = useState('');

    const [result, setResult] = useState([]);
    const [priceRange, setPriceRange] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 9; // Số lượng mục trên mỗi trang
    const sl = 0;

    const inputRef = useRef();

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        setCurrentPage(1); // Đặt lại trang hiện tại về 1 khi thực hiện tìm kiếm mới
    };
    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
        setCurrentPage(1); // Đặt lại trang hiện tại về 1 khi xóa tìm kiếm
    };

    useEffect(() => {
        const fetchPerfumes = async () => {
            try {
                let res;
                const params = {
                    page: currentPage,
                    limit: itemsPerPage,
                    sl,
                };

                if (priceRange) {
                    const [minPrice, maxPrice] = priceRange.split('-');
                    params.minPrice = minPrice;
                    params.maxPrice = maxPrice;
                }
                if (categoryId) {
                    params.categoryId = categoryId;
                }
                if (brandId) {
                    params.brandId = brandId;
                }
                if (searchValue === '') {
                    res = await request.get('perfume', { params });
                    setResult(res.data.products);
                    setTotalPages(res.data.totalPages);
                }
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchPerfumes();
    }, [searchValue, categoryId, brandId, priceRange, currentPage]);
    useEffect(() => {
        if (searchValue === '') {
            return;
        }
        const fetchSearchResults = async () => {
            try {
                const params = {
                    q: searchValue,
                    page: currentPage,
                    limit: itemsPerPage,
                    sl,
                };
                const res = await request.get('/perfume/search', { params });
                setResult(res.data.products);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchSearchResults();
    }, [searchValue, currentPage]);

    const handlePriceRangeChange = (value) => {
        setSearchValue('');
        setPriceRange(value);
        setCurrentPage(1); // Reset to the first page
    };

    const handleCategoryClick = (value) => {
        setSearchValue('');
        handlePriceRangeChange('');
        setBrandId('');
        setCategoryId(value);
        setCurrentPage(1); // Reset to the first page
    };

    const handleBrandClick = (value) => {
        setSearchValue('');
        handlePriceRangeChange('');
        setCategoryId('');
        setBrandId(value);
        setCurrentPage(1); // Reset to the first page
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    //Lấy ra loại và thương hiệu
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);

    useEffect(() => {
        request
            .get('category')
            .then((res) => {
                setCategory(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        request
            .get('brand')
            .then((response) => {
                setBrand(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <section className={cx('breadcrumb-option')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-12')}>
                            <div className={cx('breadcrumb__text')}>
                                <h4>Cửa Hàng</h4>
                                <div className={cx('breadcrumb__links')}>
                                    <Link to={config.home}>Trang Chủ</Link>
                                    <span className={cx('breadcrumb__links__icon')}>
                                        <IoChevronForwardSharp />
                                    </span>
                                    <span>Cửa Hàng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={cx('shop', 'spad')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-3')}>
                            <div className={cx('shop__sidebar')}>
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
                                        )}
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
                                <div className={cx('shop__sidebar__accordion')}>
                                    <div className={cx('accordion')} id="accordionExample">
                                        <div className={cx('card')}>
                                            <div className={cx('card-heading')}>
                                                <Link to="#" data-toggle="collapse" data-target="#collapseOne">
                                                    Thể Loại
                                                    <span className={cx('card-heading__icon')}>
                                                        <IoChevronDownSharp />
                                                    </span>
                                                </Link>
                                            </div>
                                            <div
                                                id="collapseOne"
                                                className={cx('collapse', 'show')}
                                                data-parent="#accordionExample"
                                            >
                                                <div className={cx('card-body')}>
                                                    <div className={cx('shop__sidebar__categories')}>
                                                        <ul className={cx('')}>
                                                            {category.map((item) => (
                                                                <li
                                                                    key={item.idL}
                                                                    onClick={() => handleCategoryClick(item.idL)}
                                                                >
                                                                    {item.tenL}
                                                                </li>
                                                            ))}
                                                            <li onClick={() => handleCategoryClick()}>
                                                                Tất cả nước hoa (99+)
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('card')}>
                                            <div className={cx('card-heading')}>
                                                <Link to="" data-toggle="collapse" data-target="#collapseTwo">
                                                    Thương Hiệu
                                                    <span className={cx('card-heading__icon')}>
                                                        <IoChevronDownSharp />
                                                    </span>
                                                </Link>
                                            </div>
                                            <div
                                                id="collapseTwo"
                                                className={cx('collapse', 'show')}
                                                data-parent="#accordionExample"
                                            >
                                                <div className={cx('card-body')}>
                                                    <div className={cx('shop__sidebar__brand')}>
                                                        <ul className={cx('')}>
                                                            {brand.map((item) => (
                                                                <li
                                                                    key={item.idTH}
                                                                    onClick={() => handleBrandClick(item.idTH)}
                                                                >
                                                                    {item.tenTH}
                                                                </li>
                                                            ))}
                                                            <li onClick={() => handleBrandClick()}>
                                                                Tất cả nước hoa (99+)
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('card')}>
                                            <div className={cx('card-heading')}>
                                                <Link to="#" data-toggle="collapse" data-target="#collapseThree">
                                                    Giá Tiền
                                                    <span className={cx('card-heading__icon')}>
                                                        <IoChevronDownSharp />
                                                    </span>
                                                </Link>
                                            </div>
                                            <div
                                                id="collapseThree"
                                                className={cx('collapse', 'show')}
                                                data-parent="#accordionExample"
                                            >
                                                <div className={cx('card-body')}>
                                                    <div className={cx('shop__sidebar__price')}>
                                                        <ul>
                                                            <li onClick={() => handlePriceRangeChange('0 - 2000000')}>
                                                                0 - 2.000.000
                                                            </li>
                                                            <li
                                                                onClick={() =>
                                                                    handlePriceRangeChange('2000000 - 4000000')
                                                                }
                                                            >
                                                                2.000.000 - 4.000.000
                                                            </li>
                                                            <li
                                                                onClick={() =>
                                                                    handlePriceRangeChange('4000000 - 6000000')
                                                                }
                                                            >
                                                                4.000.000 - 6.000.000
                                                            </li>
                                                            <li
                                                                onClick={() =>
                                                                    handlePriceRangeChange('6000000 - 999999999')
                                                                }
                                                            >
                                                                6.000.000 +
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('card')}>
                                            <div className={cx('card-heading')}>
                                                <Link to="#" data-toggle="collapse" data-target="#collapseFour">
                                                    Dung tích
                                                    <span className={cx('card-heading__icon')}>
                                                        <IoChevronDownSharp />
                                                    </span>
                                                </Link>
                                            </div>
                                            <div
                                                id="collapseFour"
                                                className={cx('collapse', 'show')}
                                                data-parent="#accordionExample"
                                            >
                                                <div className={cx('card-body')}>
                                                    <div className={cx('shop__sidebar__size')}>
                                                        <label htmlFor="xl">
                                                            5ml
                                                            <input type="radio" id="xl" />
                                                        </label>
                                                        <label htmlFor="xs">
                                                            10ml
                                                            <input type="radio" id="xs" />
                                                        </label>
                                                        <label htmlFor="sm">
                                                            50ml
                                                            <input type="radio" id="sm" />
                                                        </label>
                                                        <label htmlFor="md">
                                                            100ml
                                                            <input type="radio" id="md" />
                                                        </label>
                                                        <label htmlFor="xxl">
                                                            150ml
                                                            <input type="radio" id="xxl" />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('card')}>
                                            <div className={cx('card-heading')}>
                                                <Link to="" data-toggle="collapse" data-target="#collapseSix">
                                                    Nhãn Hiệu
                                                    <span className={cx('card-heading__icon')}>
                                                        <IoChevronDownSharp />
                                                    </span>
                                                </Link>
                                            </div>
                                            <div
                                                id="collapseSix"
                                                className={cx('collapse', 'show')}
                                                data-parent="#accordionExample"
                                            >
                                                <div className={cx('card-body')}>
                                                    <div className={cx('shop__sidebar__tags')}>
                                                        <Link to="#">Product</Link>
                                                        <Link to="#">Bags</Link>
                                                        <Link to="#">Shoes</Link>
                                                        <Link to="#">Fashio</Link>
                                                        <Link to="#">Clothing</Link>
                                                        <Link to="#">Hats</Link>
                                                        <Link to="#">Accessories</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-9')}>
                            <div className={cx('shop__product__option')}>
                                <div className={cx('row')}>
                                    <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6')}>
                                        <div className={cx('shop__product__option__left')}></div>
                                    </div>
                                    <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6')}>
                                        <div className={cx('shop__product__option__right')}>
                                            <p>Giá</p>
                                            <select id="sort" onChange={(e) => handlePriceRangeChange(e.target.value)}>
                                                <option value="">Tất cả</option>
                                                <option value="0-2000000"> 0 - 2.000.000</option>
                                                <option value="2000000-4000000"> 2.000.000 - 4.000.000</option>
                                                <option value="4000000-6000000">4.000.000 - 6.000.000</option>
                                                <option value="6000000-999999999">6.000.000 +</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('row')}>
                                {result.map((item) => (
                                    <ProductItem key={item.idNH} data={item} />
                                ))}
                            </div>

                            <div className={cx('row')}>
                                <div className={cx('col-lg-12')}>
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
            </section>
        </>
    );
}

export default Shop;

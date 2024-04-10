import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Shop.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config/routes';

import { IoSearch, IoChevronDownSharp, IoChevronForwardSharp } from 'react-icons/io5';
import { FaCircleXmark } from 'react-icons/fa6';
import ProductItem from '~/components/ProductItem/ProductItem';

const cx = classNames.bind(styles);

function Shop() {
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef();

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/perfume`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setResult(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

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
                                            name="q"
                                            autoComplete="off"
                                            placeholder="Search..."
                                            ref={inputRef}
                                            value={searchValue}
                                            spellCheck={false}
                                            onChange={(e) => {
                                                setSearchValue(e.target.value.trimStart());
                                            }}
                                        />
                                        {!!searchValue && (
                                            <button className={cx('search__clear')} onClick={handleClear}>
                                                <FaCircleXmark />
                                            </button>
                                        )}

                                        <button
                                            className={cx('search__search')}
                                            htmlFor="shop-sidebar-search"
                                            // type="submit"
                                            onMouseDown={(e) => e.preventDefault()}
                                        >
                                            <span className={cx('icon_search')}>
                                                <IoSearch />
                                            </span>
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
                                                            <li>
                                                                <Link to="">Tên loại</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="">Tất cả nước hoa (99+)</Link>
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
                                                        <ul>
                                                            <li>
                                                                <Link to="">hhh</Link>
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
                                                            <li>
                                                                <Link to="#">$0.00 - $100.00</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="#">$100.00 - $200.00</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="#">$200.00 - $500.00</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="#">500.00+</Link>
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
                                            <p>Sắp xếp theo giá</p>
                                            <select id="sort">
                                                <option value=""> Thấp đến cao</option>
                                                <option value=""> 0 - 2.000.000</option>
                                                <option value=""> 2.000.000 - 5.000.000</option>
                                                <option value=""> 5.000.000 +</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('row')}>
                                {result.map((item) => (
                                    <ProductItem key={item.ID} data={item} />
                                ))}
                            </div>

                            <div className={cx('row')}>
                                <div className={cx('col-lg-12')}>
                                    <div className={cx('product__pagination')}>
                                        <Link className={cx('active')} to="#">
                                            1
                                        </Link>
                                        <Link to="#">2</Link>
                                        <Link to="#">3</Link>
                                        <span>...</span>
                                        <Link to="#">21</Link>
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

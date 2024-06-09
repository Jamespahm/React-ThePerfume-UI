import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import CurrencyFormat from 'react-currency-format';

import config from '~/config/userRoutes';
import request from '~/utils/request';
import styles from './Shop-Detail.module.scss';

import { IoStar, IoStarOutline, IoStarHalf } from 'react-icons/io5';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import ProductItem from '~/components/ProductItem';

const cx = classNames.bind(styles);

function ShopDetail() {
    const [activeTab, setActiveTab] = useState('tabs-1');
    const [activeContentTab, setActiveContentTab] = useState('tabs-5');
    // const [selectedSize, setSelectedSize] = useState('100ml'); // Giá trị mặc định
    const [quantity, setQuantity] = useState(1); // Khởi tạo state cho giá trị quantity
    const { slug } = useParams();
    const [perfume, setPerfume] = useState();
    const [perfumeRelated, setPerfumeRelated] = useState([]);
    const tokenUser = localStorage.getItem('tokenUser'); // Lấy tokenUser từ localStorage
    const navigate = useNavigate();

    useEffect(() => {
        request
            .get(`perfume/${slug}`)
            .then((res) => {
                console.log('L2:', res.data);
                setPerfume(res.data);
                // setCartItems(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [slug]);

    useEffect(() => {
        request
            .get(`perfume/related/${slug}`)
            .then((res) => {
                console.log('L3:', res.data.relatedPerfumes);
                setPerfumeRelated(res.data.relatedPerfumes);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [slug]);

    // Kiểm tra xem perfume có tồn tại không trước khi render
    if (!perfume) {
        return;
    }

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    const handleContentTabClick = (tabId) => {
        setActiveContentTab(tabId);
    };
    // const handleChange = (event) => {
    //     setSelectedSize(event.target.id);
    // };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value); // Cập nhật giá trị quantity khi có sự thay đổi
    };
    const handleIncrease = () => {
        setQuantity(quantity + 1); // Cập nhật giá trị quantity khi có sự thay đổi
    };
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1); // Cập nhật giá trị quantity khi có sự thay đổi
        }
    };
    const addToCart = (idNH, soLuong) => {
        if (tokenUser) {
            const data = {
                productId: idNH,
                quantity: soLuong,
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${tokenUser}`, // Thêm token vào header Authorization
                },
            };

            request
                .post('/cart/add', data, config)
                .then((response) => {
                    console.log(response.data.message);
                    navigate('/cart');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            navigate('/login');
        }
    };

    const handleBuyNow = () => {
        if (tokenUser) {
            navigate('/checkout', {
                state: {
                    items: [
                        {
                            idNH: perfume.idNH,
                            hinhanh1: perfume.hinhanh1,
                            dungtich: perfume.dungtich,
                            tenNH: perfume.tenNH,
                            giaban: perfume.giaban,
                            soLuong: parseInt(quantity),
                        },
                    ],
                    totalAmount: parseInt(perfume.giaban) * parseInt(quantity),
                    totalQuantity: parseInt(quantity),
                },
            });
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <style>
                {`
                /* Hides the up and down arrows on input[type="number"] in Chrome, Safari, Edge, and Opera */
                input[type="number"]::-webkit-outer-spin-button,
                input[type="number"]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                /* Hides the up and down arrows on input[type="number"] in Firefox */
                input[type="number"] {
                    -moz-appearance: textfield;
                }
                `}
            </style>
            <section className={cx('shop-details')}>
                <div>
                    <div className={cx('product__details__pic')}>
                        <div className={cx('container')}>
                            <div className={cx('row')}>
                                <div className={cx('col-lg-12')}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={cx('product__details__breadcrumb', 'breadcrumb')}>
                                            <li className={cx('breadcrumb-item')}>
                                                <Link to={config.home}>Trang Chủ</Link>
                                            </li>
                                            <li className={cx('breadcrumb-item')}>
                                                <Link to={config.shop}>Cửa Hàng</Link>
                                            </li>
                                            <li className={cx('breadcrumb-item active')} aria-current="page">
                                                Chi Tiết Nước Hoa
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>

                            <div className={cx('row')}>
                                <div className={cx('col-5')}>
                                    <div className={cx('row')}>
                                        <div className={cx('tab-content')}>
                                            <div className={`tab-pane ${activeTab === 'tabs-1' ? 'active' : ''}`}>
                                                <img
                                                    src={`http://localhost:8080/img/products/${perfume.hinhanh1}`}
                                                    alt=""
                                                />
                                            </div>
                                            <div className={`tab-pane ${activeTab === 'tabs-2' ? 'active' : ''}`}>
                                                <img
                                                    src={`http://localhost:8080/img/products/${perfume.hinhanh2}`}
                                                    alt=""
                                                />
                                            </div>
                                            <div className={`tab-pane ${activeTab === 'tabs-3' ? 'active' : ''}`}>
                                                <img
                                                    src={`http://localhost:8080/img/products/${perfume.hinhanh3}`}
                                                    alt=""
                                                />
                                            </div>
                                            <div className={`tab-pane ${activeTab === 'tabs-4' ? 'active' : ''}`}>
                                                <img
                                                    src={`http://localhost:8080/img/products/${perfume.hinhanh4}`}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('row')}>
                                        <ul className={cx('nav-tabs')} role="tablist">
                                            <li className={cx({ active: activeTab === 'tabs-1' })}>
                                                <img
                                                    onClick={() => handleTabClick('tabs-1')}
                                                    src={`http://localhost:8080/img/products/${perfume.hinhanh1}`}
                                                    alt=""
                                                />
                                            </li>
                                            <li className={cx({ active: activeTab === 'tabs-2' })}>
                                                <img
                                                    onClick={() => handleTabClick('tabs-2')}
                                                    src={`http://localhost:8080/img/products/${perfume.hinhanh2}`}
                                                    alt=""
                                                />
                                            </li>
                                            <li className={cx({ active: activeTab === 'tabs-3' })}>
                                                <img
                                                    onClick={() => handleTabClick('tabs-3')}
                                                    src={`http://localhost:8080/img/products/${perfume.hinhanh3}`}
                                                    alt=""
                                                />
                                            </li>
                                            <li className={cx({ active: activeTab === 'tabs-4' })}>
                                                <img
                                                    onClick={() => handleTabClick('tabs-4')}
                                                    src={`http://localhost:8080/img/products/${perfume.hinhanh4}`}
                                                    alt=""
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={cx('col-7', '')}>
                                    <div className={cx('product__details')}>
                                        <h3>
                                            Nước hoa {perfume.tenNH} - {perfume.dungtich}
                                        </h3>

                                        <div className={cx('rating')}>
                                            <IoStar />
                                            <IoStar />
                                            <IoStar />
                                            <IoStarHalf />
                                            <IoStarOutline />
                                            <span>4.5/50 Đánh giá</span>
                                        </div>
                                        <div className={cx('product__details__price')}>
                                            <CurrencyFormat
                                                value={perfume.giaban}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' VND'}
                                            />
                                            <p> 6,000,000 VND</p>
                                        </div>
                                        <div
                                            className={cx('product__details__option__descript')}
                                            dangerouslySetInnerHTML={{ __html: perfume.mota }}
                                        />

                                        <div className={cx('product__details__option')}>
                                            {/* <div className={cx('product__details__option__size')}>
                                                <label
                                                    className={cx({ active: selectedSize === '150ml' })}
                                                    htmlFor="150ml"
                                                >
                                                    150ml
                                                    <input
                                                        type="radio"
                                                        name="dungtich"
                                                        id="150ml"
                                                        checked={selectedSize === '150ml'}
                                                        onChange={handleChange}
                                                    />
                                                </label>
                                                <label
                                                    className={cx({ active: selectedSize === '100ml' })}
                                                    htmlFor="100ml"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="dungtich"
                                                        id="100ml"
                                                        checked={selectedSize === '100ml'}
                                                        onChange={handleChange}
                                                    />
                                                    100ml
                                                </label>
                                                <label
                                                    className={cx({ active: selectedSize === '50ml' })}
                                                    htmlFor="50ml"
                                                >
                                                    50ml
                                                    <input
                                                        type="radio"
                                                        name="dungtich"
                                                        id="50ml"
                                                        checked={selectedSize === '50ml'}
                                                        onChange={handleChange}
                                                    />
                                                </label>
                                                <label
                                                    className={cx({ active: selectedSize === '10ml' })}
                                                    htmlFor="10ml"
                                                >
                                                    10ml
                                                    <input
                                                        type="radio"
                                                        name="dungtich"
                                                        id="10ml"
                                                        checked={selectedSize === '10ml'}
                                                        onChange={handleChange}
                                                    />
                                                </label>
                                            </div> */}
                                        </div>
                                        <div className={cx('product__details__cart__option')}>
                                            <div className={cx('quantity')}>
                                                <div className={cx('pro-qty')}>
                                                    <button onClick={handleIncrease}>
                                                        <FaPlus />
                                                    </button>
                                                    <input
                                                        id="quantity"
                                                        type="number"
                                                        value={quantity}
                                                        onChange={handleQuantityChange}
                                                    />
                                                    <button onClick={handleDecrease}>
                                                        <FaMinus />
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => addToCart(perfume.idNH, quantity)}
                                                className={cx('primary-btn', 'mr-4')}
                                            >
                                                Thêm Giỏ Hàng
                                            </button>
                                            <button onClick={handleBuyNow} className={cx('primary-btn')}>
                                                Đặt Hàng
                                            </button>
                                        </div>
                                        <div className={cx('product__details__last__option')}>
                                            <img
                                                src={'http://localhost:8080/img/shop-details/details-payment.png'}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('product__details__content')}>
                        <div className={cx('container')}>
                            <div className={cx('row')}>
                                <div className={cx('col-lg-12')}>
                                    <div className={cx('product__details__tab')}>
                                        <ul className={cx('nav', 'nav-tabs')} role="tablist">
                                            <li className={cx('nav-item')}>
                                                <button
                                                    className={cx('nav-link', {
                                                        active: activeContentTab === 'tabs-5',
                                                    })}
                                                    onClick={() => handleContentTabClick('tabs-5')}
                                                >
                                                    Thông Tin Chi Tiết
                                                </button>
                                            </li>
                                            <li className={cx('nav-item')}>
                                                <button
                                                    className={cx('nav-link', {
                                                        active: activeContentTab === 'tabs-6',
                                                    })}
                                                    onClick={() => handleContentTabClick('tabs-6')}
                                                >
                                                    Khách Hàng Đánh Giá(5)
                                                </button>
                                            </li>
                                            <li className={cx('nav-item')}>
                                                <button
                                                    className={cx('nav-link', {
                                                        active: activeContentTab === 'tabs-7',
                                                    })}
                                                    onClick={() => handleContentTabClick('tabs-7')}
                                                >
                                                    Mô Tả Chi Tiết
                                                </button>
                                            </li>
                                        </ul>
                                        <div className={cx('tab-content')}>
                                            <div
                                                className={cx('tab-pane', { actived: activeContentTab === 'tabs-5' })}
                                                id={'tabs-5'}
                                                role={'tabpanel'}
                                            >
                                                <div className={cx('product__details__tab__content')}>
                                                    <div
                                                        className={cx('product__details__descript')}
                                                        dangerouslySetInnerHTML={{ __html: perfume.mota }}
                                                    />
                                                    <div
                                                        className={cx('product__details__tab__content__item')}
                                                        dangerouslySetInnerHTML={{ __html: perfume.motact }}
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className={cx('tab-pane', { actived: activeContentTab === 'tabs-6' })}
                                                id={'tabs-6'}
                                                role={'tabpanel'}
                                            >
                                                {/* Nội dung của Khách Hàng Đánh Giá */}
                                            </div>
                                            <div
                                                className={cx('tab-pane', { actived: activeContentTab === 'tabs-7' })}
                                                id={'tabs-7'}
                                                role={'tabpanel'}
                                            >
                                                {/* Nội dung của Mô Tả Chi Tiết */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={cx('related', 'spad')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-12')}>
                            <h3 className={cx('related-title')}>Sản phẩm liên quan</h3>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        {perfumeRelated.map((item) => (
                            <div key={item.idNH} className={cx('col-lg-3', 'col-md-6', 'col-sm-6', 'mix')}>
                                <ProductItem data={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
export default ShopDetail;

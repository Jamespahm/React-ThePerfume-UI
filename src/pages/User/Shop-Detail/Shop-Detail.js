import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Shop-Detail.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config/routes';

import { IoStar, IoStarOutline, IoStarHalf } from 'react-icons/io5';
import { FaExchangeAlt, FaHeart } from 'react-icons/fa';

const cx = classNames.bind(styles);

function ShopDetail() {
    const [activeTab, setActiveTab] = useState('tabs-1');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const [quantity, setQuantity] = useState('1'); // Khởi tạo state cho giá trị quantity

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value); // Cập nhật giá trị quantity khi có sự thay đổi
    };
    return (
        <>
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
                                <div className={cx('col-lg-3', 'col-md-3')}>
                                    <ul className={cx('nav', 'nav-tabs')} role="tablist">
                                        <li className={cx(`nav-item${activeTab === 'tabs-1' ? 'active' : ''}`)}>
                                            <Link
                                                className={cx('nav-link')}
                                                to={''}
                                                onClick={() => handleTabClick('tabs-1')}
                                            >
                                                <div className={cx('product__thumb__pic', 'set-bg')}>
                                                    <img
                                                        src={require('~/assets/img/product/Gucci/Four Homme EDT/po1.jpg')}
                                                        alt=""
                                                    />
                                                </div>
                                            </Link>
                                        </li>
                                        <li className={cx(`nav-item ${activeTab === 'tabs-2' ? 'active' : ''}`)}>
                                            <Link
                                                className={cx('nav-link')}
                                                to={''}
                                                onClick={() => handleTabClick('tabs-2')}
                                            >
                                                <div className={cx('product__thumb__pic', 'set-bg')}>
                                                    <img
                                                        src={require('~/assets/img/product/Gucci/Four Homme EDT/po2.jpg')}
                                                        alt=""
                                                    />
                                                </div>
                                            </Link>
                                        </li>
                                        <li className={`nav-item ${activeTab === 'tabs-3' ? 'active' : ''}`}>
                                            <Link
                                                className={cx('nav-link')}
                                                to={''}
                                                onClick={() => handleTabClick('tabs-3')}
                                            >
                                                <div className={cx('product__thumb__pic', 'set-bg')}>
                                                    <img
                                                        src={require('~/assets/img/product/Gucci/Four Homme EDT/po3.jpg')}
                                                        alt=""
                                                    />
                                                </div>
                                            </Link>
                                        </li>
                                        <li className={cx(`nav-item ${activeTab === 'tabs-4' ? 'active' : ''}`)}>
                                            <Link
                                                className={cx('nav-link')}
                                                to={''}
                                                onClick={() => handleTabClick('tabs-4')}
                                            >
                                                <div className={cx('product__thumb__pic', 'set-bg')}>
                                                    <img
                                                        src={require('~/assets/img/product/Gucci/Four Homme EDT/po4.jpg')}
                                                        alt=""
                                                    />
                                                    <i className={cx('fa fa-play')}></i>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className={cx('col-lg-6', 'col-md-9')}>
                                    <div className={cx('tab-content')}>
                                        <div className={`tab-pane ${activeTab === 'tabs-1' ? 'active' : ''}`}>
                                            <div className={cx('product__details__pic__item')}>
                                                <img
                                                    src={require('~/assets/img/product/Gucci/Four Homme EDT/po1.jpg')}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className={`tab-pane ${activeTab === 'tabs-2' ? 'active' : ''}`}>
                                            <div className={cx('product__details__pic__item')}>
                                                <img
                                                    src={require('~/assets/img/product/Gucci/Four Homme EDT/po2.jpg')}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className={`tab-pane ${activeTab === 'tabs-3' ? 'active' : ''}`}>
                                            <div className={cx('product__details__pic__item')}>
                                                <img
                                                    src={require('~/assets/img/product/Gucci/Four Homme EDT/po3.jpg')}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className={`tab-pane ${activeTab === 'tabs-4' ? 'active' : ''}`}>
                                            <div className={cx('product__details__pic__item')}>
                                                <img
                                                    src={require('~/assets/img/product/Gucci/Four Homme EDT/po4.jpg')}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('product__details__content')}>
                        <div className={cx('container')}>
                            <div className={cx('row', 'd-flex', 'justify-content-center')}>
                                <div className={cx('col-lg-8')}>
                                    <div className={cx('product__details__text')}>
                                        <h4> Gucci Four Home Eau Dea Toile (Limited)</h4>
                                        <div className={cx('rating')}>
                                            <IoStar />
                                            <IoStar />
                                            <IoStar />
                                            <IoStarHalf />
                                            <IoStarOutline />
                                            <span> - 50 Reviews</span>
                                        </div>
                                        <h3>
                                            4.500.000đ <span> 6.000.000đ</span>
                                        </h3>
                                        <p>
                                            Coat with quilted lining and an adjustable hood. Featuring long sleeves with
                                            adjustable cuff tabs, adjustable asymmetric hem with elastic side tabs and a
                                            front zip fastening with placket.
                                        </p>
                                        <div className={cx('product__details__option')}>
                                            <div className={cx('product__details__option__size')}>
                                                <span>Dung tích:</span>
                                                <label htmlFor="xxl">
                                                    150ml
                                                    <input type="radio" id="xxl" />
                                                </label>
                                                <label className={cx('actived')} htmlFor="xl">
                                                    100ml
                                                    <input type="radio" id="xl" />
                                                </label>
                                                <label htmlFor="l">
                                                    50ml
                                                    <input type="radio" id="l" />
                                                </label>
                                                <label htmlFor="sm">
                                                    10ml
                                                    <input type="radio" id="sm" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className={cx('product__details__cart__option')}>
                                            <div className={cx('quantity')}>
                                                <div className={cx('pro-qty')}>
                                                    {/* Input được kết nối với state quantity thông qua thuộc tính value và hàm xử lý onChange */}
                                                    <input
                                                        type="text"
                                                        value={quantity}
                                                        onChange={handleQuantityChange}
                                                    />
                                                </div>
                                            </div>
                                            <Link to="/user/shopping-cart" className={cx('primary-btn', 'mr-4')}>
                                                Thêm Giỏ Hàng
                                            </Link>
                                            <Link to="/user/checkout" className={cx('primary-btn')}>
                                                Đặt Hàng
                                            </Link>
                                        </div>
                                        <div className={cx('product__details__btns__option')}>
                                            <Link to="#">
                                                <FaHeart />
                                                Thêm Yêu Thích
                                            </Link>
                                            <Link to="#">
                                                <FaExchangeAlt />
                                                Thêm So Sánh
                                            </Link>
                                        </div>
                                        <div className={cx('product__details__last__option')}>
                                            <h5>
                                                <span>Thương Thức Thanh Toán</span>
                                            </h5>
                                            <img
                                                src={require('~/assets/img/shop-details/details-payment.png')}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('col-lg-12')}>
                                    <div className={cx('product__details__tab')}>
                                        <ul className={cx('nav', 'nav-tabs')} role="tablist">
                                            <li className={cx('nav-item')}>
                                                <Link
                                                    className={cx('nav-link', 'active')}
                                                    data-toggle={'tab'}
                                                    to={'#tabs-5'}
                                                    role={'tab'}
                                                >
                                                    Thông Tin Chi Tiết
                                                </Link>
                                            </li>
                                            <li className={cx('nav-item')}>
                                                <Link
                                                    className={cx('nav-link')}
                                                    data-toggle={'tab'}
                                                    to={'#tabs-6'}
                                                    role={'tab'}
                                                >
                                                    Khách Hàng Nhận Xét(5)
                                                </Link>
                                            </li>
                                            <li className={cx('nav-item')}>
                                                <Link
                                                    className={cx('nav-link')}
                                                    data-toggle={'tab'}
                                                    to={'#tabs-7'}
                                                    role={'tab'}
                                                >
                                                    Mô Tả Chi Tiết
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className={cx('tab-content')}>
                                            <div className={cx('tab-pane active')} id={'tabs-5'} role={'tabpanel'}>
                                                <div className={cx('product__details__tab__content')}>
                                                    <p className={cx('note')}>
                                                        Nam tempus turpis at metus scelerisque placerat nulla deumantos
                                                        solicitud felis. Pellentesque diam dolor, elementum etos
                                                        lobortis des mollis ut risus. Sedcus faucibus an sullamcorper
                                                        mattis drostique des commodo pharetras loremos.
                                                    </p>
                                                    <div className={cx('product__details__tab__content__item')}>
                                                        <h5>Products Infomation</h5>
                                                        <p>
                                                            A Pocket PC is a handheld computer, which features many of
                                                            the same capabilities as a modern PC. These handy little
                                                            devices allow individuals to retrieve and store e-mail
                                                            messages, create a contact file, coordinate appointments,
                                                            surf the internet, exchange text messages and more. Every
                                                            product that is labeled as a Pocket PC must be accompanied
                                                            with specific software to operate the unit and must feature
                                                            a touchscreen and touchpad.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={cx('tab-pane')} id={'tabs-6'} role={'tabpanel'}>
                                                <div className={cx('product__details__tab__content')}>
                                                    <div className={cx('product__details__tab__content__item')}>
                                                        <h5>Products Infomation2</h5>
                                                        <p>
                                                            A Pocket PC is a handheld computer, which features many of
                                                            the same capabilities as a modern PC. These handy little
                                                            devices allow individuals to retrieve and store e-mail
                                                            messages, create a contact file, coordinate appointments,
                                                            surf the internet, exchange text messages and more. Every
                                                            product that is labeled as a Pocket PC must be accompanied
                                                            with specific software to operate the unit and must feature
                                                            a touchscreen and touchpad.
                                                        </p>
                                                        <p>
                                                            As is the case with any new technology product, the cost of
                                                            a Pocket PC was substantial during it’s early release. For
                                                            approximately $700.00, consumers could purchase one of
                                                            top-of-the-line Pocket PCs in 2003. These days, customers
                                                            are finding that prices have become much more reasonable now
                                                            that the newness is wearing off. For approximately $350.00,
                                                            a new Pocket PC can now be purchased.
                                                        </p>
                                                    </div>
                                                    <div className={cx('product__details__tab__content__item')}>
                                                        <h5>Material used</h5>
                                                        <p>
                                                            Polyester is deemed lower quality due to its none natural
                                                            quality’s. Made from synthetic materials, not natural like
                                                            wool. Polyester suits become creased easily and are known
                                                            for not being breathable. Polyester suits tend to have a
                                                            shine to them compared to wool and cotton suits, this can
                                                            make the suit look cheap. The texture of velvet is luxurious
                                                            and breathable. Velvet is a great choice for dinner party
                                                            jacket and can be worn all year round.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={cx('tab-pane')} id={'tabs-7'} role={'tabpanel'}>
                                                <div className={cx('product__details__tab__content')}>
                                                    <p className={cx('note')}>
                                                        Nam tempus turpis at metus scelerisque placerat nulla deumantos
                                                        solicitud felis. Pellentesque diam dolor, elementum etos
                                                        lobortis des mollis ut risus. Sedcus faucibus an sullamcorper
                                                        mattis drostique des commodo pharetras loremos.
                                                    </p>
                                                    <div className={cx('product__details__tab__content__item')}>
                                                        <h5>Products Infomation</h5>
                                                        <p>
                                                            A Pocket PC is a handheld computer, which features many of
                                                            the same capabilities as a modern PC. These handy little
                                                            devices allow individuals to retrieve and store e-mail
                                                            messages, create a contact file, coordinate appointments,
                                                            surf the internet, exchange text messages and more. Every
                                                            product that is labeled as a Pocket PC must be accompanied
                                                            with specific software to operate the unit and must feature
                                                            a touchscreen and touchpad.
                                                        </p>
                                                        <p>
                                                            As is the case with any new technology product, the cost of
                                                            a Pocket PC was substantial during it’s early release. For
                                                            approximately $700.00, consumers could purchase one of
                                                            top-of-the-line Pocket PCs in 2003. These days, customers
                                                            are finding that prices have become much more reasonable now
                                                            that the newness is wearing off. For approximately $350.00,
                                                            a new Pocket PC can now be purchased.
                                                        </p>
                                                    </div>
                                                    <div className={cx('product__details__tab__content__item')}>
                                                        <h5>Material used</h5>
                                                        <p>
                                                            Polyester is deemed lower quality due to its none natural
                                                            quality’s. Made from synthetic materials, not natural like
                                                            wool. Polyester suits become creased easily and are known
                                                            for not being breathable. Polyester suits tend to have a
                                                            shine to them compared to wool and cotton suits, this can
                                                            make the suit look cheap. The texture of velvet is luxurious
                                                            and breathable. Velvet is a great choice for dinner party
                                                            jacket and can be worn all year round.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* //////////// */}
            <section className={cx('related', 'spad')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-12')}>
                            <h3 className={cx('related-title')}>Related Product</h3>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <div
                            className={cx(
                                'col-lg-3',
                                'col-md-6',
                                'col-sm-6',
                                'col-md-6',
                                'col-sm-6',
                                'mix',
                                'hot-sales',
                            )}
                        >
                            <div className={cx('product__item', 'sale')}>
                                <div className={cx('product__item__pic', 'set-bg')}>
                                    <img src={require('~/assets/img/product/Dior/Sauvage EDT/sa1.jpg')} alt="" />
                                    <span className={cx('label')}>Sale</span>
                                    <ul className={cx('product__hover')}>
                                        <li>
                                            <Link to="#">
                                                <img src={require('~/assets/img/icon/heart.png')} alt="" />
                                                <span>Yêu thích</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <img src={require('~/assets/img/icon/cart.png')} alt="" />
                                                <span>Giỏ hàng</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/user/shop-details">
                                                <img src={require('~/assets/img/icon/compare.png')} alt="" />
                                                <span>Chi tiết</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={cx('product__item__text')}>
                                    <h6>Piqué Biker Jacket</h6>
                                    <div className={cx('rating')}>
                                        <IoStar />
                                        <IoStar />
                                        <IoStar />
                                        <IoStarHalf />
                                        <IoStarOutline />
                                    </div>
                                    <h6>$67.24</h6>
                                </div>
                            </div>
                        </div>

                        <div
                            className={cx(
                                'col-lg-3',
                                'col-md-6',
                                'col-sm-6',
                                'col-md-6',
                                'col-sm-6',
                                'mix',
                                'new-arrivals',
                            )}
                        >
                            <div className={cx('product__item', 'sale')}>
                                <div className={cx('product__item__pic', 'set-bg')}>
                                    <img src={require('~/assets/img/product/Dior/Homme Sport/ho1.jpg')} alt="" />
                                    <span className={cx('label')}>Sale</span>
                                    <ul className={cx('product__hover')}>
                                        <li>
                                            <Link to="#">
                                                <img src={require('~/assets/img/icon/heart.png')} alt="" />
                                                <span>Yêu thích</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <img src={require('~/assets/img/icon/cart.png')} alt="" />
                                                <span>Giỏ hàng</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <img src={require('~/assets/img/icon/compare.png')} alt="" />
                                                <span>Chi tiết</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={cx('product__item__text')}>
                                    <h6>Piqué Biker Jacket</h6>
                                    <div className={cx('rating')}>
                                        <IoStar />
                                        <IoStar />
                                        <IoStar />
                                        <IoStarHalf />
                                        <IoStarOutline />
                                    </div>
                                    <h6>$67.24</h6>
                                </div>
                            </div>
                        </div>

                        <div className={cx('col-lg-3', 'col-md-6', 'col-sm-6', 'col-md-6', 'col-sm-6', 'mix')}>
                            <div className={cx('product__item', 'sale')}>
                                <div className={cx('product__item__pic', 'set-bg')}>
                                    <img
                                        src={require('~/assets/img/product/Calvin Klein/Eternity EDP/et1.jpg')}
                                        alt=""
                                    />
                                    <ul className={cx('product__hover')}>
                                        <li>
                                            <Link to="#">
                                                <img src={require('~/assets/img/icon/heart.png')} alt="" />
                                                <span>Yêu thích</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <img src={require('~/assets/img/icon/cart.png')} alt="" />
                                                <span>Giỏ hàng</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <img src={require('~/assets/img/icon/compare.png')} alt="" />
                                                <span>Chi tiết</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={cx('product__item__text')}>
                                    <h6>Piqué Biker Jacket</h6>
                                    <div className={cx('rating')}>
                                        <IoStar />
                                        <IoStar />
                                        <IoStar />
                                        <IoStarHalf />
                                        <IoStarOutline />
                                    </div>
                                    <h6>$43.48</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ShopDetail;

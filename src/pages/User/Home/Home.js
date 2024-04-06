import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import style from './Home.module.scss';
import images from '~/assets/img';

import { IoStar, IoStarOutline, IoStarHalf } from 'react-icons/io5';

const cx = classNames.bind(style);
function Home() {
    return (
        <>
            <section className={cx('banner', 'spad')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-7', 'offset-lg-4')}>
                            <div className={cx('banner__item')}>
                                <div className={cx('banner__item__pic')}>
                                    <img src={require('~/assets/img/banner/banner-1.jpg')} alt="" />
                                </div>
                                <div className={cx('banner__item__text')}>
                                    <h2>Bộ Sưu Tập Nước Hoa Nam </h2>
                                    <Link to="#">Xem Ngay</Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-5')}>
                            <div className={cx('banner__item', 'banner__item--middle')}>
                                <div className={cx('banner__item__pic')}>
                                    <img src={require('~/assets/img/banner/banner-2.jpg')} alt="" />
                                </div>
                                <div className={cx('banner__item__text')}>
                                    <h2>Phụ Kiện Không Thể Thiếu</h2>
                                    <Link to="#">Xem Ngay</Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-7')}>
                            <div className={cx('banner__item', 'banner__item--last')}>
                                <div className={cx('banner__item__pic')}>
                                    <img src={require('~/assets/img/banner/banner-3.jpg')} alt="" />
                                </div>
                                <div className={cx('banner__item__text')}>
                                    <h2>Nước Hoa Chính Hãng</h2>
                                    <Link to="#">Xem Ngay</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={cx('product', 'spad')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-12')}>
                            <ul className={cx('filter__controls')}>
                                <li className={cx('active')} data-filter="*">
                                    Best Sellers
                                </li>
                                <li>New Arrivals</li>
                                <li>Hot Sales</li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('product__filter', 'row')}>
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
                            <div className={cx('product__item')}>
                                <div className={cx('product__item__pic', 'set-bg')}>
                                    <img
                                        src={require('~/assets/img/product/Gucci/Bloom Acqua di Fiori/bl1.jpg')}
                                        alt=""
                                    />
                                    <span className={cx('label')}>New</span>
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
                                'hot-sales',
                            )}
                        >
                            <div className={cx('product__item')}>
                                <div className={cx('product__item__pic', 'set-bg')}>
                                    <img src={images.productImg} alt="" />
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
                                    <img src={images.productImg} alt="" />
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
                                    <h6>$43.48</h6>
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
                            <div className={cx('product__item')}>
                                <div className={cx('product__item__pic', 'set-bg')}>
                                    <img src={images.productImg} alt="" />
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
                                    <h6>$60.9</h6>
                                </div>
                            </div>
                        </div>
                        {/* ///// */}
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
                            <div className={cx('product__item')}>
                                <div className={cx('product__item__pic', 'set-bg')}>
                                    <img
                                        src={require('~/assets/img/product/Gucci/Bloom Acqua di Fiori/bl1.jpg')}
                                        alt=""
                                    />
                                    <span className={cx('label')}>New</span>
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
                                    <div className={cx('product__color__select')}>
                                        <label htmlFor="pc-1">
                                            <input type="radio" id="pc-1" />
                                        </label>
                                        <label className={cx('active', 'black')} htmlFor="pc-2">
                                            <input type="radio" id="pc-2" />
                                        </label>
                                        <label className={cx('grey')} htmlFor="pc-3">
                                            <input type="radio" id="pc-3" />
                                        </label>
                                    </div>
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
                                'hot-sales',
                            )}
                        >
                            <div className={cx('product__item')}>
                                <div className={cx('product__item__pic', 'set-bg')}>
                                    <img src={images.productImg} alt="" />
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
                                    <div className={cx('product__color__select')}>
                                        <label htmlFor="pc-4">
                                            <input type="radio" id="pc-4" />
                                        </label>
                                        <label className={cx('active', 'black')} htmlFor="pc-5">
                                            <input type="radio" id="pc-5" />
                                        </label>
                                        <label className={cx('grey')} htmlFor="pc-6">
                                            <input type="radio" id="pc-6" />
                                        </label>
                                    </div>
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
                                    <img src={images.productImg} alt="" />
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
                                    <h6>$43.48</h6>
                                    <div className={cx('product__color__select')}>
                                        <label htmlFor="pc-7">
                                            <input type="radio" id="pc-7" />
                                        </label>
                                        <label className={cx('active', 'black')} htmlFor="pc-8">
                                            <input type="radio" id="pc-8" />
                                        </label>
                                        <label className={cx('grey')} htmlFor="pc-9">
                                            <input type="radio" id="pc-9" />
                                        </label>
                                    </div>
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
                            <div className={cx('product__item')}>
                                <div className={cx('product__item__pic', 'set-bg')}>
                                    <img src={images.productImg} alt="" />
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
                                    <h6>$60.9</h6>
                                    <div className={cx('product__color__select')}>
                                        <label htmlFor="pc-10">
                                            <input type="radio" id="pc-10" />
                                        </label>
                                        <label className={cx('active', 'black')} htmlFor="pc-11">
                                            <input type="radio" id="pc-11" />
                                        </label>
                                        <label className={cx('grey')} htmlFor="pc-12">
                                            <input type="radio" id="pc-12" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={cx('categories', 'spad')}>
                <div className={cx('container')}>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className={cx('categories__text')}>
                                <h2>
                                    Bộ Sưu Tập <br /> <span>Nước hoa</span> <br /> Phụ Kiện
                                </h2>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className={cx('categories__hot__deal')}>
                                <img src={require('~/assets/img/product/product-7.jpg')} alt="" />
                                <div className={cx('hot__deal__sticker')}>
                                    <span>Giảm giá</span>
                                    <h5>$29.99</h5>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4', 'offset-lg-1')}>
                            <div className={cx('categories__deal__countdown')}>
                                <span>Giảm Giá Trong Tuần</span>
                                <h2>Nước hoa D&G K Eau de Toilette(100ml)</h2>
                                <div className={cx('categories__deal__countdown__timer')} id="countdown">
                                    <div className={cx('cd-item')}>
                                        <span>3</span>
                                        <p>Ngày</p>
                                    </div>
                                    <div className={cx('cd-item')}>
                                        <span>1</span>
                                        <p>Giờ</p>
                                    </div>
                                    <div className={cx('cd-item')}>
                                        <span>50</span>
                                        <p>Phút</p>
                                    </div>
                                    <div className={cx('cd-item')}>
                                        <span>18</span>
                                        <p>Giây</p>
                                    </div>
                                </div>
                                <Link to="#" className="primary-btn">
                                    Mua Ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={cx('instagram', 'spad')}>
                <div className={cx('container')}>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className={cx('instagram__pic')}>
                                <div className={cx('instagram__pic__item', 'set-bg')}>
                                    <img src={require('~/assets/img/instagram/instagram-1.jpg')} alt="" />
                                </div>
                                <div className={cx('instagram__pic__item', 'set-bg')}>
                                    <img src={require('~/assets/img/instagram/instagram-2.jpg')} alt="" />
                                </div>
                                <div className={cx('instagram__pic__item', 'set-bg')}>
                                    <img src={require('~/assets/img/instagram/instagram-3.jpg')} alt="" />
                                </div>
                                <div className={cx('instagram__pic__item', 'set-bg')}>
                                    <img src={require('~/assets/img/instagram/instagram-4.jpg')} alt="" />
                                </div>
                                <div className={cx('instagram__pic__item', 'set-bg')}>
                                    <img src={require('~/assets/img/instagram/instagram-5.jpg')} alt="" />
                                </div>
                                <div className={cx('instagram__pic__item', 'set-bg')}>
                                    <img src={require('~/assets/img/instagram/instagram-6.jpg')} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className={cx('instagram__text')}>
                                <h2>Instagram</h2>
                                <p>
                                    Đến với The Luxury Perfumes, bạn thoải mái tìm kiếm và trải nghiệm rất nhiều nhãn
                                    hiệu nổi tiếng, từ cao cấp cho tới bình dân. Tới Showroom để thoả sức trải nghiệm
                                    dịch vụ, xịt thử và lựa chọn cho mình một mùi hương ưng ý. The Luxury Perfumes tự
                                    hào là trung tâm nước hoa hàng đầu, với gần 20 năm trong ngành xa xỉ phẩm này. Chất
                                    lượng đảm bảo, hàng chính hãng, giá tốt nhất với nhiều deal hot. Cam kết bảo hành
                                    đến giọt cuối cùng..
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx('latest', 'spad')}>
                <div className={cx('container')}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className={cx('section-title')}>
                                <span>Tin Mới</span>
                                <h2>Nước Hoa Xu Hướng</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('col-lg-4', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('blog__item')}>
                                <div className={cx('blog__item__pic', 'set-bg')}>
                                    <img src={require('~/assets/img/blog/blog-1.jpg')} alt="" />
                                </div>
                                <div className={cx('blog__item__text')}>
                                    <span>
                                        <img src={cx('~/assets/img/icon/calendar.png')} alt="" /> Ngày 16 tháng 2 năm
                                        2020
                                    </span>
                                    <h5>Nước hoa Dolce & Gabbana (D&G) chính hãng, uy tín, chất lượng.</h5>
                                    <Link to="#">Đọc Thêm</Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('blog__item')}>
                                <div className={cx('blog__item__pic', 'set-bg')}>
                                    <img src={require('~/assets/img/blog/blog-2.jpg')} alt="" />
                                </div>
                                <div className={cx('blog__item__text')}>
                                    <span>
                                        <img src={cx('~/assets/img/icon/calendar.png')} alt="" /> Ngày 21 tháng 2 năm
                                        2020
                                    </span>
                                    <h5>Nước hoa D&G - một biểu tượng của thời trang phong cách Ý hiện đại.</h5>
                                    <Link to="#">Đọc Thêm</Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('blog__item')}>
                                <div className={cx('blog__item__pic', 'set-bg')}>
                                    <img src={require('~/assets/img/blog/blog-3.jpg')} alt="" />
                                </div>
                                <div className={cx('blog__item__text')}>
                                    <span>
                                        <img src={cx('~/assets/img/icon/calendar.png')} alt="" /> Ngày 28 tháng 2 năm
                                        2020
                                    </span>
                                    <h5>Một phiên bản đặc biệt từ dòng Light Blue</h5>
                                    <Link to="#">Đọc Thêm</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;

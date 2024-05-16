import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import CurrencyFormat from 'react-currency-format';

import request from '~/utils/request';
import style from './Home.module.scss';

import { IoStar, IoStarOutline, IoStarHalf } from 'react-icons/io5';

const cx = classNames.bind(style);
function Home() {
    const [perfumes, setPerfume] = useState([]);
    useEffect(() => {
        const fetchPerfumes = async () => {
            try {
                const res = await request.get('/perfume/sales');
                setPerfume(res.data);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchPerfumes();
    }, []);
    ////////
    const navigate = useNavigate();
    const addToCart = (idNH, soLuong) => {
        const tokenUser = localStorage.getItem('tokenUser'); // Lấy tokenUser từ localStorage

        // Dữ liệu cần gửi đi
        const data = {
            productId: idNH,
            quantity: soLuong,
        };

        // Cấu hình các thông số của yêu cầu POST
        const config = {
            headers: {
                Authorization: `Bearer ${tokenUser}`, // Thêm token vào header Authorization
            },
        };

        // Gửi yêu cầu POST đến endpoint /cart/add
        request
            .post('/cart/add', data, config)
            .then((response) => {
                // Xử lý kết quả từ server (nếu cần)
                console.log(response.data.message);
                navigate('/cart');
            })
            .catch((error) => {
                // Xử lý lỗi (nếu có)
                console.error('Error:', error);
            });
    };
    const addToFav = (idNH, soLuong) => {
        const tokenUser = localStorage.getItem('tokenUser'); // Lấy tokenUser từ localStorage

        // Dữ liệu cần gửi đi
        const data = {
            productId: idNH,
            quantity: soLuong,
        };

        // Cấu hình các thông số của yêu cầu POST
        const config = {
            headers: {
                Authorization: `Bearer ${tokenUser}`, // Thêm token vào header Authorization
            },
        };

        // Gửi yêu cầu POST đến endpoint /cart/add
        request
            .post('/favourite/add', data, config)
            .then((response) => {
                // Xử lý kết quả từ server (nếu cần)
                console.log(response.data.message);
                navigate('/favourite');
            })
            .catch((error) => {
                // Xử lý lỗi (nếu có)
                console.error('Error:', error);
            });
    };
    /////////

    const calculateTimeLeft = () => {
        const difference = +new Date('2024-05-30') - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            // Nếu hết thời gian, hiển thị 0 0 0 0
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    });

    return (
        <>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
                <div className={cx('carousel-inner')}>
                    <div className={cx('carousel-item active')}>
                        <img
                            src={require('~/assets/img/banner/271495673_1604142653284925_1036844338235843408_n.jpg')}
                            className={cx('d-block w-100')}
                            alt="..."
                        />
                    </div>
                    <div className={cx('carousel-item')}>
                        <img
                            src={require('~/assets/img/banner/294372419_1750235718675617_4597454377284936060_n.jpg')}
                            className={cx('d-block w-100')}
                            alt="..."
                        />
                    </div>
                    <div className={cx('carousel-item')}>
                        <img
                            src={require('~/assets/img/banner/301993485_1782695175429671_5496805865580899953_n.jpg')}
                            className={cx('d-block w-100')}
                            alt="..."
                        />
                    </div>
                </div>
                <button
                    className={cx('carousel-control-prev')}
                    type="button"
                    data-target="#carouselExampleFade"
                    data-slide="prev"
                >
                    <span className={cx('carousel-control-prev-icon')} aria-hidden="true"></span>
                    <span className={cx('sr-only')}>Previous</span>
                </button>
                <button
                    className={cx('carousel-control-next')}
                    type="button"
                    data-target="#carouselExampleFade"
                    data-slide="next"
                >
                    <span className={cx('carousel-control-next-icon')} aria-hidden="true"></span>
                    <span className={cx('sr-only')}>Next</span>
                </button>
            </div>
            <section className={cx('banner', 'spad')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-7', 'offset-lg-4')}>
                            <div className={cx('banner__item')}>
                                <div className={cx('banner__item__pic')}>
                                    <img src={require('~/assets/img/banner/banner-1.jpg')} alt="" />
                                </div>
                                <div className={cx('banner__item__text')}>
                                    <h2>Nước Hoa Chính Hãng </h2>
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
                                    <h2>Bộ Sưu Tập Nước Hoa Cho Nam Giới</h2>
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
                                    <h2>Các Thương Hiệu Hàng Đầu</h2>
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
                        {perfumes.map((perfume) => (
                            <div
                                key={perfume.idNH}
                                className={cx('col-lg-3', 'col-md-6', 'col-sm-6', 'col-md-6', 'col-sm-6', 'mix')}
                            >
                                <div className={cx('product__item', 'sale')}>
                                    <div className={cx('product__item__pic', 'set-bg')}>
                                        <img src={require(`/src/assets/img/product/${perfume.hinhanh1}`)} alt="" />
                                        <span className={cx('label')}>Sales</span>
                                        <ul className={cx('product__hover')}>
                                            <li>
                                                <button onClick={() => addToFav(perfume.idNH, 1)}>
                                                    <img src={require('~/assets/img/icon/heart.png')} alt="" />
                                                    <span>Yêu thích</span>
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => addToCart(perfume.idNH, 1)}>
                                                    <img src={require('~/assets/img/icon/cart.png')} alt="" />
                                                    <span>Giỏ hàng</span>
                                                </button>
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
                                        <h6>{perfume.tenNH}</h6>
                                        <p className={cx('quantity')}>Số lượng: {perfume.soluong} </p>
                                        <div className={cx('rating')}>
                                            <IoStar />
                                            <IoStar />
                                            <IoStar />
                                            <IoStarHalf />
                                            <IoStarOutline />
                                        </div>
                                        <h6>
                                            <CurrencyFormat
                                                value={perfume.giaban}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' VND'}
                                            />
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                                    <span>Giảm giá còn</span>
                                    <h6>2.500.000</h6>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4', 'offset-lg-1')}>
                            <div className={cx('categories__deal__countdown')}>
                                <span>Giảm Giá Trong Tháng</span>
                                <h2>Nước hoa D&G K Eau de Toilette(100ml)</h2>
                                <div className={cx('categories__deal__countdown__timer')} id="countdown">
                                    <div className={cx('cd-item')}>
                                        <span>{timeLeft.days}</span>
                                        <p>Ngày</p>
                                    </div>
                                    <div className={cx('cd-item')}>
                                        <span>{timeLeft.hours}</span>
                                        <p>Giờ</p>
                                    </div>
                                    <div className={cx('cd-item')}>
                                        <span>{timeLeft.minutes}</span>
                                        <p>Phút</p>
                                    </div>
                                    <div className={cx('cd-item')}>
                                        <span>{timeLeft.seconds}</span>
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
                                    Đến với The Perfume, bạn thoải mái tìm kiếm và trải nghiệm rất nhiều nhãn hiệu nổi
                                    tiếng, từ cao cấp cho tới bình dân. Tới Với chúng tôi để thoả sức trải nghiệm dịch
                                    vụ, xịt thử và lựa chọn cho mình một mùi hương ưng ý. The Perfume tự hào là trung
                                    tâm nước hoa hàng đầu, với gần 20 năm trong ngành xa xỉ phẩm này. Chất lượng đảm
                                    bảo, hàng chính hãng, giá tốt nhất với nhiều deal hot. Cam kết bảo hành đến giọt
                                    cuối cùng..
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

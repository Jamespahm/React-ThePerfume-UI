import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import CurrencyFormat from 'react-currency-format';

import style from './Checkout.module.scss';
import config from '~/config/userRoutes';
import request from '~/utils/request';
import { IoChevronForwardSharp } from 'react-icons/io5';

const cx = classNames.bind(style);

function Checkout() {
    const [tenNhan, setTenNhan] = useState('');
    const [sdtNhan, setSdtNhan] = useState('');
    const [diaChiNhan, setDiaChiNhan] = useState('');
    const [thanhToan, setThanhToan] = useState('');
    const [user, setUser] = useState(null);
    const ship = 25000;
    const [message, setMessage] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    const tokenUser = localStorage.getItem('tokenUser');
    const location = useLocation();
    const navigate = useNavigate();

    const { items, cartItems, totalAmount, totalQuantity } = location.state || {
        items: null,
        cartItems: [],
        totalAmount: 0,
        totalQuantity: 0,
    };

    const handleCheckout = async () => {
        if (!thanhToan) {
            setMessage('Vui lòng chọn hình thức thanh toán !');
            return;
        }
        try {
            if (items && items.length > 0) {
                const item = items[0];
                await request.post(
                    '/payment/checkoutSingle',
                    {
                        idNH: item.idNH,
                        soLuong: totalQuantity,
                        tenNhan,
                        sdtNhan,
                        diaChiNhan,
                        thanhToan,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${tokenUser}`,
                        },
                    },
                );
            } else {
                await request.post(
                    '/payment/checkout',
                    {
                        tenNhan,
                        sdtNhan,
                        diaChiNhan,
                        thanhToan,
                        cartItems,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${tokenUser}`,
                        },
                    },
                );
            }

            navigate('/myorder');
        } catch (error) {
            setMessage(error.response ? error.response.data.error : 'Có lỗi xảy ra');
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await request.get('/user/profile', {
                    headers: {
                        Authorization: `Bearer ${tokenUser}`,
                    },
                });
                setUser(response.data);
                setTenNhan(response.data.tenKH); // Khởi tạo giá trị tenNhan từ user profile
                setSdtNhan(response.data.sdt); // Khởi tạo giá trị sdtNhan từ user profile
                setDiaChiNhan(response.data.diachi); // Khởi tạo giá trị diaChiNhan từ user profile
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchUserProfile();
    }, [tokenUser]);

    const handleCopy = () => {
        const textToCopy = `${tenNhan} - ${sdtNhan}`;
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 1000); // Reset state after 1s
            })
            .catch((err) => {
                setMessage('Sao chép thất bại!');
            });
    };

    if (!user) {
        return null; // Trả về null hoặc loading spinner khi user chưa được tải về
    }
    console.log('items: ', items);
    console.log('cartItems: ', cartItems);
    console.log('SL: ', totalQuantity);
    console.log('TT: ', totalAmount);

    return (
        <>
            <section className={cx('breadcrumb-option')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-12')}>
                            <div className={cx('breadcrumb__text')}>
                                <h4>Thanh toán</h4>
                                <div className={cx('breadcrumb__links')}>
                                    <Link to={config.home}>Trang Chủ</Link>
                                    <span className={cx('breadcrumb__links__icon')}>
                                        <IoChevronForwardSharp />
                                    </span>
                                    <Link to={config.shop}>Cửa Hàng</Link>
                                    <span className={cx('breadcrumb__links__icon')}>
                                        <IoChevronForwardSharp />
                                    </span>
                                    <span>Thanh toán</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx('checkout')}>
                <div className={cx('container', 'mt-4', 'mb-4')}>
                    <div className={cx('checkout__form')}>
                        <form
                            className={cx('needs-validation')}
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleCheckout();
                            }}
                        >
                            <div className={cx('row')}>
                                <div className={cx('col-lg-6', 'col-md-6')}>
                                    <div className={cx('row')}>
                                        <div className={cx('checkout__input')}>
                                            <label htmlFor="tenNhan" className={cx('form-label')}>
                                                <p>
                                                    Tên người nhận <span>*</span>
                                                </p>
                                            </label>
                                            <input
                                                type="text"
                                                id="tenNhan"
                                                value={tenNhan}
                                                onChange={(e) => setTenNhan(e.target.value)}
                                                className={cx('form-control')}
                                                autoComplete="off"
                                                required
                                                placeholder="Họ tên"
                                            />
                                        </div>
                                        <div className={cx('checkout__input')}>
                                            <label htmlFor="sdtNhan" className={cx('form-label')}>
                                                <p>
                                                    Số điện thoại<span>*</span>
                                                </p>
                                            </label>
                                            <input
                                                type="tel"
                                                id="sdtNhan"
                                                value={sdtNhan}
                                                onChange={(e) => setSdtNhan(e.target.value)}
                                                maxLength={10}
                                                pattern="^0[0-9]{9}"
                                                title="Số điện thoại phải gồm 10 chữ số."
                                                className={cx('form-control')}
                                                autoComplete="off"
                                                required
                                                placeholder="Số điện thoại"
                                            />
                                        </div>
                                        <div className={cx('checkout__input')}>
                                            <label htmlFor="diaChiNhan" className={cx('form-label')}>
                                                <p>
                                                    Địa chỉ nhận hàng<span>*</span>
                                                </p>
                                            </label>
                                            <input
                                                type="text"
                                                id="diaChiNhan"
                                                value={diaChiNhan}
                                                onChange={(e) => setDiaChiNhan(e.target.value)}
                                                className={cx('form-control')}
                                                autoComplete="off"
                                                required
                                                placeholder="Địa chỉ (Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành Phố)"
                                            />
                                        </div>
                                        <div className={cx('checkout__input__checkbox')}>
                                            <label htmlFor="thanhToan" className={cx('form-label')}>
                                                <p>
                                                    Thanh toán<span>* </span>
                                                    {message && <span>{message}</span>}
                                                </p>
                                            </label>

                                            <div className={cx('payment-options')}>
                                                <label className={cx('payment-option')}>
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            name="payment"
                                                            value="cod"
                                                            onChange={(e) => setThanhToan(e.target.value)}
                                                        />
                                                        Thanh toán khi nhận hàng (COD)
                                                    </div>
                                                </label>
                                                <label className={cx('payment-option')}>
                                                    <div className={cx('payment-bank')}>
                                                        <input
                                                            type="radio"
                                                            name="payment"
                                                            value="banking"
                                                            onChange={(e) => setThanhToan(e.target.value)}
                                                        />
                                                        Chuyển Khoản Ngân Hàng
                                                        <div className={cx('bank-details')}>
                                                            <p>
                                                                Quý Khách Hàng vui lòng chuyển khoản theo thông tin bên
                                                                dưới
                                                            </p>
                                                            <p>Tài Khoản MB Bank (Ngân Hàng Quân Đội)</p>
                                                            <p>
                                                                <strong>0866866540</strong>
                                                            </p>
                                                            <p>Pham Huy Hoang</p>
                                                            <p>
                                                                Nội Dung: {tenNhan} - {sdtNhan}
                                                                <button
                                                                    type="button"
                                                                    className={cx('btn-copy')}
                                                                    onClick={handleCopy}
                                                                >
                                                                    {copySuccess ? 'Đã sao chép' : 'Sao chép'}
                                                                </button>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('col-lg-6', 'col-md-6')}>
                                    <div className={cx('checkout__order')}>
                                        <h4 className={cx('order__title')}>Đơn Hàng Của Bạn</h4>

                                        <ul className={cx('checkout__order__items')}>
                                            {(items && items.length > 0 ? items : cartItems).map((item) => (
                                                <li key={item.idNH || item.idGH}>
                                                    <img
                                                        src={`http://localhost:8080/img/products/${item.hinhanh1}`}
                                                        alt=""
                                                    />
                                                    <div className={cx('quantity')}>{item.soLuong}</div>
                                                    <div className={cx('checkout__order__items--detail')}>
                                                        <h5> {item.tenNH}</h5>
                                                        <p>{item.dungtich}</p>
                                                    </div>{' '}
                                                    <CurrencyFormat
                                                        value={item.giaban}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                        <ul className={cx('checkout__total__all')}>
                                            <li>
                                                Tổng tiền sản phẩm{' '}
                                                <span>
                                                    {' '}
                                                    <span>
                                                        <CurrencyFormat
                                                            value={totalAmount}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={''}
                                                        />
                                                    </span>
                                                </span>
                                            </li>
                                            <li>
                                                Vận chuyển{' '}
                                                <span>
                                                    {totalQuantity > 1 ? (
                                                        'MIỄN PHÍ'
                                                    ) : (
                                                        <CurrencyFormat
                                                            value={ship}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                        />
                                                    )}
                                                </span>
                                            </li>
                                            <li>
                                                TỔNG TIỀN
                                                <span>
                                                    {totalQuantity > 1 ? (
                                                        <CurrencyFormat
                                                            value={totalAmount}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                        />
                                                    ) : (
                                                        <CurrencyFormat
                                                            value={totalAmount}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={' VND'}
                                                        />
                                                    )}
                                                </span>
                                            </li>
                                        </ul>

                                        <button type="submit" className={cx('site-btn')}>
                                            Đặt Hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Checkout;

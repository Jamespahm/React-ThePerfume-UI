import { useState } from 'react';
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
    const [message, setMessage] = useState('');
    const tokenUser = localStorage.getItem('tokenUser'); // Giả sử token được lưu trữ trong localStorage
    const location = useLocation();
    const navigate = useNavigate(); // Khởi tạo useNavigate

    const { cartItems, totalAmount, totalQuantity } = location.state || {
        cartItems: [],
        totalAmount: 0,
        totalQuantity: 0,
    };

    const handleCheckout = async () => {
        try {
            const response = await request.post(
                '/payment/checkout',
                {
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
            setMessage(response.data.message);
            navigate('/');
        } catch (error) {
            setMessage(error.response ? error.response.data.error : 'Có lỗi xảy ra');
        }
    };

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
                                <div className={cx('col-lg-7', 'col-md-6')}>
                                    <h6 className={cx('coupon__code')}>
                                        <span className={cx('icon_tag_alt')}></span> Có phiếu giảm giá? Bấm vào đây để
                                        nhập mã của bạn
                                    </h6>
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
                                            />
                                        </div>
                                        <div className={cx('checkout__input')}>
                                            <label htmlFor="sdtNhan" className={cx('form-label')}>
                                                <p>
                                                    Số điện thoại<span>*</span>
                                                </p>
                                            </label>
                                            <input
                                                type="text"
                                                id="sdtNhan"
                                                value={sdtNhan}
                                                onChange={(e) => setSdtNhan(e.target.value)}
                                                className={cx('form-control')}
                                                autoComplete="off"
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
                                            />
                                        </div>
                                        <div className={cx('checkout__input')}>
                                            <label htmlFor="thanhToan" className={cx('form-label')}>
                                                <p>
                                                    Thanh toán<span>*</span>
                                                </p>
                                            </label>
                                            <select
                                                id="thanhToan"
                                                value={thanhToan}
                                                onChange={(e) => setThanhToan(e.target.value)}
                                                className={cx('form-control')}
                                            >
                                                <option value="">Chọn phương thức thanh toán</option>
                                                <option value="cash">Thanh toán khi nhận hàng</option>
                                                <option value="paypal">Paypal</option>
                                                <option value="credit-card">Thẻ tín dụng</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('col-lg-5', 'col-md-6')}>
                                    <div className={cx('checkout__order')}>
                                        <h4 className={cx('order__title')}>Đơn Hàng Của Bạn</h4>
                                        <div className={cx('checkout__order__products')}>
                                            Sản Phẩm
                                            <span>Giá</span>
                                        </div>
                                        <ul className={cx('checkout__total__products')}>
                                            {cartItems.map((item, index) => (
                                                <li key={item.idGH}>
                                                    {index + 1}. {item.tenNH}
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
                                                Số lượng <span>{totalQuantity}</span>
                                            </li>
                                            <li>
                                                Tổng
                                                <span>
                                                    <CurrencyFormat
                                                        value={totalAmount}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={' VND'}
                                                    />
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
                        {message && <p>{message}</p>}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Checkout;

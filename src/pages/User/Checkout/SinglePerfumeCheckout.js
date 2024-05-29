import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import CurrencyFormat from 'react-currency-format';
import style from './Checkout.module.scss';
import request from '~/utils/request';

const cx = classNames.bind(style);

function SinglePerfumeCheckout({ perfume }) {
    const [tenNhan, setTenNhan] = useState('');
    const [sdtNhan, setSdtNhan] = useState('');
    const [diaChiNhan, setDiaChiNhan] = useState('');
    const [thanhToan, setThanhToan] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);
    const tokenUser = localStorage.getItem('tokenUser');
    const navigate = useNavigate();

    const handleCheckout = async () => {
        try {
            const response = await request.post(
                '/payment/checkoutSingle',
                {
                    idNH: perfume.idNH,
                    soLuong: 1,
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

    if (!user) {
        return null; // Trả về null hoặc loading spinner khi user chưa được tải về
    }

    return (
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
                            />
                        </div>
                        <div className={cx('checkout__input')}>
                            <label htmlFor="sdtNhan" className={cx('form-label')}>
                                <p>
                                    Số điện thoại<span>*</span>
                                </p>
                            </label>
                            <input
                                type="number"
                                id="sdtNhan"
                                value={sdtNhan}
                                onChange={(e) => setSdtNhan(e.target.value)}
                                className={cx('form-control')}
                                autoComplete="off"
                                required
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
                                required
                            >
                                <option value="">Chọn phương thức thanh toán</option>
                                <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
                                <option value="Thanh toán qua paypal">Thanh toán qua Paypal</option>
                                <option value="Thẻ tín dụng">Thẻ tín dụng</option>
                            </select>
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
                                <li>
                                    {perfume.tenNH}
                                    <CurrencyFormat
                                        value={perfume.giaban}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' VND'}
                                    />
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
    );
}

export default SinglePerfumeCheckout;

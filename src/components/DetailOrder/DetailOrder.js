import { useState } from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import classNames from 'classnames/bind';
import moment from 'moment';

import style from './DetailOrder.module.scss';

const cx = classNames.bind(style);

function DetailOrder({ order, isVisible, onClose, onCancelOrder }) {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = () => {
        const textToCopy = `${order.idHD}-${order.sdtnhan}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 1000); // Reset state after 1s
        });
    };

    if (!isVisible || !order) {
        return null;
    }

    return (
        <div className={cx('modal')}>
            <div className={cx('modal-content')}>
                <div className={cx('modal-header')}>
                    <h5 className="">
                        Mã Đơn: {order.idHD} {' - '}
                        {order.trangthai === '1' && 'Chờ Xác Nhận'}
                        {order.trangthai === '2' && 'Đang Giao'}
                        {order.trangthai === '3' && 'Hoàn Thành'}
                        {order.trangthai === '4' && 'Đã Hủy'}
                    </h5>

                    <span className={cx('close')} onClick={onClose}>
                        &times;
                    </span>
                </div>
                <div className={cx('row', 'bdg')}>
                    <div className={cx('col-7', 'br')}>
                        <div className={cx('order-details')}>
                            <div className={cx('details-section')}>
                                <div className={cx('section')}>
                                    <h3>Thông tin liên hệ</h3>
                                    <p>{order.tennhan}</p>
                                    <p>{order.sdtnhan}</p>
                                </div>
                                <div className={cx('section')}>
                                    <h3>Địa chỉ vận chuyển</h3>
                                    <p>{order.diachinhan}</p>
                                </div>
                            </div>

                            <div className={cx('details-section')}>
                                <div className={cx('section')}>
                                    <h3>Phương thức thanh toán</h3>
                                    <p>
                                        {order.thanhtoan === 'banking' && 'Thanh toán chuyển khoản'}
                                        {order.thanhtoan === 'cod' && 'Thanh toán khi nhận hàng'}
                                    </p>
                                    <p>
                                        <CurrencyFormat
                                            className={cx('section-price')}
                                            value={order.tongtien}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' VND'}
                                        />
                                    </p>
                                    {/* <span>
                                        {order.thanhtoan === 'banking' &&
                                            'Vui lòng thanh toán và đợi người bán xác nhận !'}
                                    </span> */}
                                </div>
                                <div className={cx('section')}>
                                    <h3>Thời gian đặt</h3>
                                    <p> {moment(order.ngaydat).format('HH:mm:ss DD/MM/YYYY')}</p>
                                </div>
                            </div>
                            <div className={cx('details-section')}>
                                {order.thanhtoan === 'banking' && (
                                    <div className={cx('section')}>
                                        <h3>Cách thức thanh toán</h3>
                                        <p>Tài Khoản MB Bank</p>
                                        <p>0866866540</p>
                                        <p>Pham Huy Hoang</p>
                                        <p>
                                            Nội dung: {order.idHD}-{order.sdtnhan}
                                            <button type="button" className={cx('btn-copy')} onClick={handleCopy}>
                                                {copySuccess ? 'Đã sao chép' : 'Sao chép'}
                                            </button>
                                        </p>
                                    </div>
                                )}
                                {order.trangthai === '3' && (
                                    <div className={cx('section')}>
                                        <h3>Đã giao</h3>
                                        <p>{moment(order.ngaygiao).format('HH:mm:ss DD/MM/YYYY')}</p>
                                    </div>
                                )}
                            </div>

                            <div className={cx('help-link')}>
                                <span>
                                    Bạn cần trợ giúp? <Link to="#">Liên hệ với chúng tôi</Link>
                                </span>
                                {order.trangthai === '1' && (
                                    <button
                                        className={cx('continue__btn', 'btn--primary')}
                                        onClick={() => onCancelOrder(order.idHD)}
                                    >
                                        Hủy đơn hàng
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-5')}>
                        <div className={cx('order-details')}>
                            {order.details.map((detail) => (
                                <div key={detail.idCTHD} className={cx('order__item')}>
                                    <img
                                        src={`http://localhost:8080/img/products/${detail.hinhanh1}`}
                                        alt=""
                                        className={cx('order__item-img')}
                                    />
                                    <div className={cx('order__item-quantity')}>{detail.soLuong}</div>
                                    <div className={cx('order__item-details')}>
                                        <h3 className={cx('order__item-title')}>{detail.tenNH}</h3>
                                        <p className={cx('order__item-capacity')}>Dung tích: {detail.dungtich}</p>
                                    </div>
                                    <div className={cx('order__item-price')}>
                                        <CurrencyFormat
                                            value={detail.giaban}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={''}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className={cx('order__footer')}>
                                <div className={cx('order__price')}>
                                    Tổng tiền:
                                    <CurrencyFormat
                                        className={cx('ml-2')}
                                        value={order.tongtien}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' VND'}
                                    />
                                </div>
                                <div className={cx('order__actions')}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailOrder;

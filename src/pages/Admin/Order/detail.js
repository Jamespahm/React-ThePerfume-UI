import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import classNames from 'classnames/bind';

import request from '~/utils/request';
import styles from '../Admin.module.scss';

const cx = classNames.bind(styles);

function OrderDetail() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await request.get(`/order/detail/${orderId}`);
                setOrder(response.data.order);
                setDetails(response.data.details);
            } catch (error) {
                console.error('Error fetching order detail:', error);
            }
        };

        fetchOrderDetail();
    }, [orderId]);

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card strpied-tabled-with-hover">
                        <div className="card-body table-full-width table-responsive">
                            <table className={cx('table', 'table-black')}>
                                <thead>
                                    <tr>
                                        <th>Người nhận</th>
                                        <th>Sđt nhận</th>
                                        <th>Địa chỉ</th>
                                        <th>Tổng tiền</th>
                                        <th>Thời gian</th>
                                        <th>Hình thức thanh toán</th>
                                        <th>trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{order.tennhan}</td>
                                        <td>{order.sdtnhan}</td>
                                        <td>{order.diachinhan}</td>
                                        <td>
                                            <CurrencyFormat
                                                value={order.tongtien}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' VND'}
                                            />
                                        </td>
                                        <td>{moment(order.ngaydat).format('HH:mm:ss DD/MM/YYYY')}</td>
                                        <td>{order.thanhtoan}</td>
                                        <td>{order.trangthai}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className={cx('table', 'table-hover')}>
                                <thead>
                                    <tr>
                                        <th>Hình ảnh</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Dung tích</th>
                                        <th>Số lượng</th>
                                        <th>Giá bán</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details.map((detail) => (
                                        <tr key={detail.idCTHD}>
                                            <td>
                                                <img
                                                    src={require(`/src/assets/img/product/${detail.hinhanh1}`)}
                                                    alt=""
                                                />
                                            </td>
                                            <td>{detail.tenNH}</td>
                                            <td>{detail.dungtich}</td>
                                            <td>{detail.soLuong}</td>
                                            <td>
                                                <CurrencyFormat
                                                    value={detail.giaban}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={' VND'}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderDetail;

import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import classNames from 'classnames/bind';

import request from '~/utils/request';
import styles from '../Admin.module.scss';

const cx = classNames.bind(styles);

function UpdateOrder() {
    const { id } = useParams();
    const navigator = useNavigate();
    const [order, setOrder] = useState(null);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        const fetchUpdateOrder = async () => {
            try {
                const response = await request.get(`/order/detail/${id}`);
                setOrder(response.data.order);
                setDetails(response.data.details);
            } catch (error) {
                console.error('Error fetching order detail:', error);
            }
        };

        fetchUpdateOrder();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await request.put(`/order/update/${id}`, {
                order,
                details,
            });
            navigator('/admin/qlhd'); // Chuyển hướng sau khi cập nhật thành công
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={handleSubmit}>
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
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {/* {order.tennhan} */}
                                                <input
                                                    type="text"
                                                    name="tennhan"
                                                    value={order.tennhan}
                                                    onChange={handleInputChange}
                                                    className={cx('order-update-input', 'ten-input')}
                                                />
                                            </td>
                                            <td>
                                                {/* {order.sdtnhan} */}
                                                <input
                                                    type="tel"
                                                    name="sdtnhan"
                                                    value={order.sdtnhan}
                                                    onChange={handleInputChange}
                                                    className={cx('order-update-input', 'sdt-input')}
                                                />
                                            </td>
                                            <td>
                                                {/* {order.diachinhan} */}
                                                <input
                                                    type="text"
                                                    name="diachinhan"
                                                    value={order.diachinhan}
                                                    onChange={handleInputChange}
                                                    className={cx('order-update-input', 'dc-input')}
                                                />
                                            </td>
                                            <td>
                                                <CurrencyFormat
                                                    value={order.tongtien}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                />
                                            </td>
                                            <td>{moment(order.ngaydat).format('HH:mm:ss DD/MM/YYYY')}</td>
                                            <td>
                                                {order.thanhtoan === 'cod' && 'Thanh toán khi nhận hàng'}
                                                {order.thanhtoan === 'banking' && 'Chuyển khoản ngân hàng'}
                                            </td>
                                            <td>
                                                <select
                                                    className={cx('order-update-input')}
                                                    name="trangthai"
                                                    value={order.trangthai}
                                                    onChange={handleInputChange}
                                                >
                                                    <option className={cx('state-option')} value="1">
                                                        Chờ xác nhận
                                                    </option>
                                                    <option className={cx('state-option')} value="2">
                                                        Đang giao
                                                    </option>

                                                    <option className={cx('state-option')} value="3">
                                                        Hoàn thành
                                                    </option>
                                                    <option className={cx('state-option')} value="4">
                                                        Hủy
                                                    </option>
                                                </select>
                                            </td>
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
                                        {details.map((detail, index) => (
                                            <tr key={detail.idCTHD}>
                                                <td>
                                                    <img
                                                        src={`http://localhost:8080/img/products/${detail.hinhanh1}`}
                                                        alt=""
                                                    />
                                                </td>
                                                <td>{detail.tenNH}</td>
                                                <td>{detail.dungtich}</td>
                                                <td>
                                                    {detail.soLuong}
                                                    {/* <input
                                                        type="number"
                                                        name="soLuong"
                                                        value={detail.soLuong}
                                                        onChange={(e) => handleDetailChange(index, e)}
                                                        className={cx('form-control')}
                                                    /> */}
                                                </td>
                                                <td>
                                                    <CurrencyFormat
                                                        value={detail.giaban}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={' VND'}
                                                        readOnly
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Link to={'/admin/qlhd'} className={cx('btn', 'btn-warning', 'btn-add')}>
                            Quay lại
                        </Link>
                        <button type="submit" className={cx('btn', 'btn-primary', 'btn-add', 'ml-3')}>
                            Cập nhật
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateOrder;

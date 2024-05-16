import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { IoStar, IoStarOutline, IoStarHalf } from 'react-icons/io5';
import CurrencyFormat from 'react-currency-format';
import React from 'react';
import Image from '../Image';
import request from '~/utils/request';

const cx = classNames.bind(styles);
function ProductItem({ data }) {
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

    return (
        <div className={cx('col-lg-4', 'col-md-6', 'col-sm-6')}>
            <Link to={`/shop-detail/${data.slug}`}>
                <div className={cx('product__item')}>
                    <div className={cx('product__item__pic', 'set-bg')}>
                        <Image src={require(`/src/assets/img/product/${data.hinhanh1}`)} alt="" />
                        <ul className={cx('product__hover')}>
                            <li>
                                <button onClick={() => addToFav(data.idNH, 1)}>
                                    <Image src={require('~/assets/img/icon/heart.png')} alt="" />
                                    <span>Yêu thích</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToCart(data.idNH, 1)}>
                                    <img src={require('~/assets/img/icon/cart.png')} alt="" />
                                    <span>Thêm giỏ hàng</span>
                                </button>
                            </li>
                            <li>
                                <button to={`/shop-detail/${data.slug}`}>
                                    <img src={require('~/assets/img/icon/compare.png')} alt="" />
                                    <span>Xem chi tiết</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('product__item__text')}>
                        <h6>{data.tenNH}</h6>
                        <p className={cx('quantity')}>Số lượng: {data.soluong} </p>
                        <div className={cx('rating')}>
                            <IoStar />
                            <IoStar />
                            <IoStar />
                            <IoStarHalf />
                            <IoStarOutline />
                        </div>
                        <h6>
                            <CurrencyFormat
                                value={data.giaban}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' VND'}
                            />
                        </h6>
                    </div>
                </div>
            </Link>
        </div>
    );
}

ProductItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default ProductItem;

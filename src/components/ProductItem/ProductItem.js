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
    const tokenUser = localStorage.getItem('tokenUser'); // Lấy tokenUser từ localStorage
    const navigate = useNavigate();
    const postRequest = (url, payload) => {
        if (tokenUser) {
            const config = {
                headers: {
                    Authorization: `Bearer ${tokenUser}`, // Thêm token vào header Authorization
                },
            };

            request
                .post(url, payload, config)
                .then((response) => {
                    console.log(response.data.message);
                    navigate(url.includes('favourite') ? '/favourite' : '/cart');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            navigate('/login');
        }
    };

    const addToCart = (idNH, soLuong) => {
        postRequest('/cart/add', { productId: idNH, quantity: soLuong });
    };

    const addToFav = (idNH, soLuong) => {
        postRequest('/favourite/add', { productId: idNH, quantity: soLuong });
    };

    return (
        // <div className={cx()}>
        <Link to={`/shop-detail/${data.slug}`}>
            <div className={cx('product__item')}>
                <div className={cx('product__item__pic', 'set-bg')}>
                    <Image src={`http://localhost:8080/img/products/${data.hinhanh1}`} alt="" />
                    <ul className={cx('product__hover')}>
                        <li>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToFav(data.idNH, 1);
                                }}
                            >
                                <Image src={'http://localhost:8080/img/icon/heart.png'} alt="" />
                                <span>Yêu thích</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToCart(data.idNH, 1);
                                }}
                            >
                                <img src={'http://localhost:8080/img/icon/cart.png'} alt="" />
                                <span>Thêm giỏ hàng</span>
                            </button>
                        </li>
                        <li>
                            <button to={`/shop-detail/${data.slug}`}>
                                <img src={'http://localhost:8080/img/icon/compare.png'} alt="" />
                                <span>Xem chi tiết</span>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className={cx('product__item__text')}>
                    <h6>{data.tenNH}</h6>
                    <p className={cx('quantity')}>Đã bán: {data.soluongban} </p>
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
        // </div>
    );
}

ProductItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default ProductItem;

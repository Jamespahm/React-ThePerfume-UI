import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './CartItemProduct.module.scss';
import React from 'react';
import CurrencyFormat from 'react-currency-format';

// import Image from '../Image';
import { IoCloseSharp } from 'react-icons/io5';
import { FaPlus, FaMinus } from 'react-icons/fa6';
// import request from '~/utils/request';

const cx = classNames.bind(styles);

function CartItemProduct({ data, onDelete, onIncrease, onDecrease }) {
    const handleDelete = () => {
        onDelete(data.idGH);
    };

    const handleIncrease = () => {
        onIncrease(data.idGH);
    };
    const handleDecrease = () => {
        onDecrease(data.idGH);
    };
    return (
        <tr>
            <td className={cx('product__cart__item')}>
                <Link to={`/shop-detail/${data.slug}`}>
                    <div className={cx('product__cart__item__pic')}>
                        <img src={`http://localhost:8080/img/products/${data.hinhanh1}`} alt="" />
                    </div>
                    <div className={cx('product__cart__item__text')}>
                        <h5>{data.tenNH}</h5>
                        <h6>{data.dungtich}</h6>
                    </div>
                </Link>
            </td>
            <td className={cx('quantity__item')}>
                <div className={cx('quantity')}>
                    <button onClick={handleIncrease}>
                        <FaPlus />
                    </button>
                    <input name={data.tenNH} value={data.soLuong} readOnly />
                    <button onClick={handleDecrease}>
                        <FaMinus />
                    </button>
                </div>
            </td>
            <td className={cx('cart__price')}>
                <CurrencyFormat value={data.giaban} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
            </td>
            <td>
                <button className={cx('cart__close')} onClick={handleDelete}>
                    <IoCloseSharp />
                </button>
            </td>
        </tr>
    );
}

CartItemProduct.propTypes = {
    data: PropTypes.object.isRequired,
};
export default CartItemProduct;

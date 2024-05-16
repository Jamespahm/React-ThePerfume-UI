import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './FavItemProduct.module.scss';
import React from 'react';
import CurrencyFormat from 'react-currency-format';

// import Image from '../Image';
import { IoCloseSharp } from 'react-icons/io5';
// import request from '~/utils/request';

const cx = classNames.bind(styles);

function FavItemProduct({ data, onDelete }) {
    const handleDelete = () => {
        onDelete(data.idDSYT);
    };

    return (
        <tr>
            <td className={cx('product__cart__item')}>
                <Link to={`/shop-detail/${data.slug}`}>
                    <div className={cx('product__cart__item__pic')}>
                        <img src={require(`/src/assets/img/product/${data.hinhanh1}`)} alt="" />
                    </div>
                    <div className={cx('product__cart__item__text')}>
                        <h5>{data.tenNH}</h5>
                    </div>
                    <h6>{data.dungtich}</h6>
                </Link>
            </td>
            <td>
                <h6>{data.dungtich}</h6>
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

FavItemProduct.propTypes = {
    data: PropTypes.object.isRequired,
};
export default FavItemProduct;

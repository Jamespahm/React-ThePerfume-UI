import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { IoStar, IoStarOutline, IoStarHalf } from 'react-icons/io5';

const cx = classNames.bind(styles);

function ProductItem({ data }) {
    return (
        <div className={cx('col-lg-4', 'col-md-6', 'col-sm-6')}>
            <div className={cx('product__item')}>
                <div className={cx('product__item__pic', 'set-bg')}>
                    <img src={require(`/src/assets/img/product/${data.HinhAnh}`)} alt="" />
                    {/* <span className={cx('label')}>New</span> */}
                    <ul className={cx('product__hover')}>
                        <li>
                            <Link to="#">
                                <img src={require('~/assets/img/icon/heart.png')} alt="" />
                                <span>Yêu thích</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <img src={require('~/assets/img/icon/cart.png')} alt="" />
                                <span>Giỏ hàng</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/shop-details">
                                <img src={require('~/assets/img/icon/compare.png')} alt="" />
                                <span>Chi tiết</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('product__item__text')}>
                    <h6>{data.TenNH}</h6>
                    <div className={cx('rating')}>
                        <IoStar />
                        <IoStar />
                        <IoStar />
                        <IoStarHalf />
                        <IoStarOutline />
                    </div>
                    <h6>{data.GiaBan} đ</h6>
                </div>
            </div>
        </div>
    );
}

ProductItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default ProductItem;

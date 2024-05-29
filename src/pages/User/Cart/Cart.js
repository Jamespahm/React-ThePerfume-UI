import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import CurrencyFormat from 'react-currency-format';

import style from './Cart.module.scss';
import config from '~/config/userRoutes';
import request from '~/utils/request';

import { IoChevronForwardSharp } from 'react-icons/io5';
import CartItemProduct from '~/components/CartItemProduct';

const cx = classNames.bind(style);

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const navigator = useNavigate();
    const tokenUser = localStorage.getItem('tokenUser'); // Lấy tokenUser từ localStorage

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await request.get('/cart/items', {
                    headers: {
                        Authorization: `Bearer ${tokenUser}`, // Gửi tokenUser trong header
                    },
                });
                // Tính tổng tiền và tổng số lượng sản phẩm
                calculateTotals(response.data);
                setCartItems(response.data);
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchCartItems();
    }, [tokenUser]);

    const calculateTotals = (items) => {
        const totalAmount = items.reduce((acc, item) => acc + item.soLuong * item.giaban, 0);
        const totalQuantity = items.reduce((acc, item) => acc + item.soLuong, 0);
        setTotalAmount(totalAmount);
        setTotalQuantity(totalQuantity);
    };
    const handleDeleteCartItem = async (cartItemId) => {
        try {
            await request.delete(`/cart/items/${cartItemId}/delete`);
            // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm trong giỏ hàng
            const updatedCartItems = cartItems.filter((item) => item.idGH !== cartItemId);
            setCartItems(updatedCartItems);
            calculateTotals(updatedCartItems);
        } catch (error) {
            console.log('error', error);
        }
    };
    const handleIncreaseQuantity = async (itemId) => {
        try {
            // Lấy thông tin sản phẩm hiện tại từ cartItems
            const currentItem = cartItems.find((item) => item.idGH === itemId);

            // Nếu số lượng của sản phẩm đang là 1, hiển thị hộp thoại xác nhận trước khi giảm số lượng
            if (currentItem.soLuong >= currentItem.soluong) {
                alert('Sản phẩm vượt quá số lượng trong kho !');

                return; // Trả về sản phẩm với số lượng = 1 nếu không xác nhận xóa
            } else {
                await request.put(`/cart/items/${itemId}/increase`);
                // Sau khi tăng thành công, cập nhật lại số lượng của sản phẩm trong giỏ hàng
                const updatedCartItems = cartItems.map((item) => {
                    if (item.idGH === itemId) {
                        // Cập nhật số lượng của sản phẩm đã được tăng lên 1
                        return {
                            ...item,
                            soLuong: item.soLuong + 1,
                        };
                    }
                    return item;
                });

                setCartItems(updatedCartItems);
                calculateTotals(updatedCartItems);
            }
        } catch (error) {
            console.log('error', error);
        }
    };
    const handleDecreaseQuantity = async (itemId) => {
        try {
            // Lấy thông tin sản phẩm hiện tại từ cartItems
            const currentItem = cartItems.find((item) => item.idGH === itemId);

            // Nếu số lượng của sản phẩm đang là 1, hiển thị hộp thoại xác nhận trước khi giảm số lượng
            if (currentItem.soLuong === 1) {
                let text = 'Xóa sản phẩm khỏi giỏ hàng ?';
                if (window.confirm(text) === true) {
                    handleDeleteCartItem(itemId);
                } else {
                    return; // Trả về sản phẩm với số lượng = 1 nếu không xác nhận xóa
                }
            } else {
                await request.put(`/cart/items/${itemId}/decrease`);

                // Gửi yêu cầu giảm số lượng đến server

                // Sau khi giảm thành công, cập nhật lại số lượng của sản phẩm trong giỏ hàng
                const updatedCartItems = cartItems.map((item) => {
                    if (item.idGH === itemId) {
                        // Cập nhật số lượng của sản phẩm đã được giảm đi 1
                        return {
                            ...item,
                            soLuong: item.soLuong - 1,
                        };
                    }
                    return item;
                });

                setCartItems(updatedCartItems);
                calculateTotals(updatedCartItems);
            }
        } catch (error) {
            console.log('error', error);
        }
    };
    const handleCheckout = () => {
        navigator('/checkout', { state: { cartItems, totalAmount, totalQuantity } });
    };

    console.log('cart:', cartItems);
    console.log('tt:', totalQuantity);

    return (
        <>
            <section className={cx('breadcrumb-option')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-12')}>
                            <div className={cx('breadcrumb__text')}>
                                <h4>Giỏ Hàng</h4>
                                <div className={cx('breadcrumb__links')}>
                                    <Link to={config.home}>Trang Chủ</Link>
                                    <span className={cx('breadcrumb__links__icon')}>
                                        <IoChevronForwardSharp />
                                    </span>
                                    <Link to={config.shop}>Cửa Hàng</Link>
                                    <span className={cx('breadcrumb__links__icon')}>
                                        <IoChevronForwardSharp />
                                    </span>
                                    <span>Giỏ Hàng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx('shopping-cart')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-8')}>
                            <div className={cx('shopping__cart__table')}>
                                {tokenUser ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sản Phẩm</th>
                                                <th>Số Lượng</th>
                                                <th>Đơn Giá</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item) => (
                                                <CartItemProduct
                                                    key={item.idGH}
                                                    data={item}
                                                    onDelete={handleDeleteCartItem}
                                                    onIncrease={handleIncreaseQuantity}
                                                    onDecrease={handleDecreaseQuantity}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <h1>Bạn chưa đăng nhập</h1>
                                )}
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6')}>
                                    <div className={cx('continue__btn')}>
                                        <Link to="/shop/">Tiếp Tục Mua Sắm</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4')}>
                            <div className={cx('shopping__cart__detail')}>
                                <div className={cx('cart__discount')}>
                                    <h6>Nhập Mã Giảm Giá</h6>
                                    <form action="#">
                                        <input type="text" name="magiamgia" placeholder="Nhập mã giảm giá" />
                                        <button className={cx('primary-btn')} type="submit">
                                            Áp Dụng
                                        </button>
                                    </form>
                                </div>
                                <div className={cx('cart__total')}>
                                    <h6>Tổng Cộng</h6>
                                    <ul>
                                        <li>
                                            Số lượng <span>{totalQuantity}</span>
                                        </li>
                                        <li>
                                            Tổng tiền{' '}
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
                                    <button onClick={handleCheckout} className={cx('primary-btn')}>
                                        Tiến Hành Thanh Toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Cart;

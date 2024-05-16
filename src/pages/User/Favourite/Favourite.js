import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import request from '~/utils/request';
import style from './Favourite.module.scss';
import config from '~/config/userRoutes';
import FavItemProduct from '~/components/FavItemProduct';
import { IoChevronForwardSharp } from 'react-icons/io5';

const cx = classNames.bind(style);

function Favourite() {
    const [items, setItems] = useState([]);
    const tokenUser = localStorage.getItem('tokenUser'); // Lấy tokenUser từ localStorage
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await request.get('/favourite/items', {
                    headers: {
                        Authorization: `Bearer ${tokenUser}`, // Gửi tokenUser trong header
                    },
                });
                setItems(response.data);
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchItems();
    }, [tokenUser]);
    const handleDeleteItem = async (cartItemId) => {
        try {
            await request.delete(`/favourite/items/${cartItemId}/delete`);
            // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm trong dsyt
            const updatedItems = items.filter((item) => item.idDSYT !== cartItemId);
            setItems(updatedItems);
        } catch (error) {
            console.log('error', error);
        }
    };
    return (
        <>
            <section className={cx('breadcrumb-option')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-12')}>
                            <div className={cx('breadcrumb__text')}>
                                <h4>Danh Sách Yêu Thích</h4>
                                <div className={cx('breadcrumb__links')}>
                                    <Link to={config.home}>Trang Chủ</Link>
                                    <span className={cx('breadcrumb__links__icon')}>
                                        <IoChevronForwardSharp />
                                    </span>
                                    <Link to={config.shop}>Cửa Hàng</Link>
                                    <span className={cx('breadcrumb__links__icon')}>
                                        <IoChevronForwardSharp />
                                    </span>
                                    <span>Nước Hoa Yêu Thích</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={cx('shopping-cart', 'spad')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-88')}>
                            <div className={cx('shopping__cart__table')}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nước Hoa</th>
                                            <th>Dung tích</th>
                                            <th>Giá Tiền</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => (
                                            <FavItemProduct key={item.idDSYT} data={item} onDelete={handleDeleteItem} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6')}>
                                    <div className={cx('continue__btn')}>
                                        <Link to="/shop">Tiếp Tục Mua Sắm</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Favourite;

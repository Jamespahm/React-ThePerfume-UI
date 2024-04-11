import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './News.module.scss';

const cx = classNames.bind(style);
function News() {
    return (
        <>
            <section className={cx('breadcrumb-blog', 'set-bg')} data-setbg="assets/img/breadcrumb-bg.jpg">
                <img src={require('~/assets/img/breadcrumb-bg.jpg')} alt="" />
            </section>
            <section className={cx('blog', 'spad')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-4', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('blog__item')}>
                                <div className={cx('blog__item__pic', 'set-bg')} data-setbg="img/blog/blog-1.jpg">
                                    <img src={require('~/assets/img/blog/blog-1.jpg')} alt="" />
                                </div>
                                <div className={cx('blog__item__text')}>
                                    <span>
                                        <img src={require('~/assets/img/icon/calendar.png')} alt="" /> Ngày 16 tháng 2
                                        năm 2020
                                    </span>
                                    <h5>Hướng đến mục tiêu cao hơn của Mastopexy</h5>
                                    <Link to="#">Đọc Thêm</Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('blog__item')}>
                                <div className={cx('blog__item__pic', 'set-bg')} data-setbg="img/blog/blog-2.jpg">
                                    <img src={require('~/assets/img/blog/blog-2.jpg')} alt="" />
                                </div>
                                <div className={cx('blog__item__text')}>
                                    <span>
                                        <img src={require('~/assets/img/icon/calendar.png')} alt="" /> 21 February 2020
                                    </span>
                                    <h5>Ban nhạc vĩnh cửu tồn tại mãi mãi</h5>
                                    <Link to="#">Đọc Thêm</Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('blog__item')}>
                                <div className={cx('blog__item__pic', 'set-bg')} data-setbg="img/blog/blog-3.jpg">
                                    <img src={require('~/assets/img/blog/blog-3.jpg')} alt="" />
                                </div>
                                <div className={cx('blog__item__text')}>
                                    <span>
                                        <img src={require('~/assets/img/icon/calendar.png')} alt="" /> 28 February 2020
                                    </span>
                                    <h5>Lợi ích sức khỏe của kính râm</h5>
                                    <Link to="#">Đọc Thêm</Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('blog__item')}>
                                <div className={cx('blog__item__pic', 'set-bg')} data-setbg="img/blog/blog-4.jpg">
                                    <img src={require('~/assets/img/blog/blog-4.jpg')} alt="" />
                                </div>
                                <div className={cx('blog__item__text')}>
                                    <span>
                                        <img src={require('~/assets/img/icon/calendar.png')} alt="" /> 16 February 2020
                                    </span>
                                    <h5>Hướng đến mục tiêu cao hơn của Mastopexy</h5>
                                    <Link to="#">Đọc Thêm</Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('blog__item')}>
                                <div className={cx('blog__item__pic', 'set-bg')} data-setbg="img/blog/blog-5.jpg">
                                    <img src={require('~/assets/img/blog/blog-5.jpg')} alt="" />
                                </div>
                                <div className={cx('blog__item__text')}>
                                    <span>
                                        <img src={require('~/assets/img/icon/calendar.png')} alt="" /> 21 February 2020
                                    </span>
                                    <h5>Nhẫn Cưới Món Quà Để Đời</h5>
                                    <Link to="#">Đọc Thêm</Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('blog__item')}>
                                <div
                                    className={cx('blog__item__pic', 'set-bg')}
                                    data-setbg="assets/img/blog/blog-6.jpg"
                                >
                                    <img src={require('~/assets/img/blog/blog-6.jpg')} alt="" />
                                </div>
                                <div className={cx('blog__item__text')}>
                                    <span>
                                        <img src={require('~/assets/img/icon/calendar.png')} alt="" /> 28 February 2020
                                    </span>
                                    <h5>Các phương pháp tẩy lông khác nhau</h5>
                                    <Link to="#">Đọc Thêm</Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('blog__item')}>
                                <div className={cx('blog__item__pic', 'set-bg')} data-setbg="img/blog/blog-7.jpg">
                                    <img src={require('~/assets/img/blog/blog-7.jpg')} alt="" />
                                </div>
                                <div className={cx('blog__item__text')}>
                                    <span>
                                        <img src={require('~/assets/img/icon/calendar.png')} alt="" /> 16 February 2020
                                    </span>
                                    <h5>Phẫu thuật mắt Lasik Bạn đã sẵn sàng chưa</h5>
                                    <Link to="#">Đọc Thêm</Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('blog__item')}>
                                <div className={cx('blog__item__pic', 'set-bg')} data-setbg="img/blog/blog-8.jpg">
                                    <img src={require('~/assets/img/blog/blog-8.jpg')} alt="" />
                                </div>
                                <div className={cx('blog__item__text')}>
                                    <span>
                                        <img src={require('~/assets/img/icon/calendar.png')} alt="" /> 21 February 2020
                                    </span>
                                    <h5>Phẫu thuật mắt Lasik Bạn đã sẵn sàng chưa</h5>
                                    <Link to="#">Đọc Thêm</Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('blog__item')}>
                                <div className={cx('blog__item__pic', 'set-bg')} data-setbg="img/blog/blog-9.jpg">
                                    <img src={require('~/assets/img/blog/blog-9.jpg')} alt="" />
                                </div>
                                <div className={cx('blog__item__text')}>
                                    <span>
                                        <img src={require('~/assets/img/icon/calendar.png')} alt="" /> 28 February 2020
                                    </span>
                                    <h5>Lasik Eye Surgery Are You Ready</h5>
                                    <Link to="#">Đọc Thêm</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default News;

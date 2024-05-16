import { Link } from 'react-router-dom';

import config from '~/config/userRoutes';
import classNames from 'classnames/bind';
import style from './Footer.module.scss';
import images from '~/assets/img';

import { RiMailSendLine } from 'react-icons/ri';

const cx = classNames.bind(style);
function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className={cx('footer__about')}>
                            {/* <div className={cx('footer__logo')}>
                                <Link to={config.home}>
                                    <img src={images.logoHead} alt="" />
                                </Link>
                            </div> */}
                            <div>
                                <p>
                                    Họ và tên: Phạm Huy Hoàng
                                    <br />
                                    Mã SV : 12520068
                                    <br />
                                    Tên đề tài: Xây dựng website giới thiệu và bán nước hoa online
                                    {/*Khách hàng là trung tâm của mô hình kinh doanh độc đáo của chúngtôi, bao gồm cả thiết kế. */}
                                </p>
                            </div>
                            <Link to={config.home}>
                                <img src={images.payment} alt="" />
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
                        <div className={cx('footer__widget')}>
                            <h6>Mua Sắm</h6>
                            <ul>
                                <li>
                                    <Link to="#">Cửa hàng nước hoa</Link>
                                </li>
                                <li>
                                    <Link to="#">Nước hoa Xu Hướng</Link>
                                </li>
                                <li>
                                    <Link to="#">Thương hiệu</Link>
                                </li>
                                <li>
                                    <Link to="#">Chăm sóc khách hàng</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-6">
                        <div className={cx('footer__widget')}>
                            <h6>Thông Tin</h6>
                            <ul>
                                <li>
                                    <Link to="#">Liên hệ chúng tôi</Link>
                                </li>
                                <li>
                                    <Link to="#">Hình thức thanh toán</Link>
                                </li>
                                <li>
                                    <Link to="#">Vận chuyển</Link>
                                </li>
                                <li>
                                    <Link to="#">Trả lại & Trao đổi</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
                        <div className={cx('footer__widget')}>
                            <h6>BẢN TIN</h6>
                            <div className={cx('footer__newslatter')}>
                                <p>
                                    Hãy là người đầu tiên biết về sản phẩm mới, các chương trình khuyến mãi của cửa
                                    hàng!
                                </p>
                                <form action="footer-send-email">
                                    <input id="footer-send-email" type="text" placeholder="Gửi email ..." />
                                    <button htmlFor="footer-send-email" type="submit">
                                        <RiMailSendLine className={cx('footer--icon__send')} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

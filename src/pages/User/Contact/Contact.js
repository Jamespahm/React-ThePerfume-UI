import classNames from 'classnames/bind';
import style from './Contact.module.scss';
import Iframe from 'react-iframe';

const cx = classNames.bind(style);

function Contact() {
    return (
        <>
            <div className={cx('map')}>
                <Iframe
                    url="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7452.490700335217!2d106.061781!3d20.94266!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a30555555555%3A0x39a8acd006ab8e69!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgUGjhuqFtIEvhu7kgVGh14bqtdCBIxrBuZyBZw6puLCBDxqEgc-G7nyAy!5e0!3m2!1svi!2s!4v1712814850135!5m2!1svi!2s"
                    height="500"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    allowfullscreen=""
                    aria-hidden="false"
                    tabindex="0"
                />
            </div>
            <section className={cx('contact', 'spad')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-6 col-md-6')}>
                            <div className={cx('contact__text')}>
                                <div className={cx('section-title')}>
                                    {/* <span>Thông Tin</span> */}
                                    <h2>Liên Hệ Với Chúng Tôi</h2>
                                    <p>
                                        As you might expect of a company that began as a high-end interiors contractor,
                                        we pay strict attention.
                                    </p>
                                </div>
                                <ul>
                                    <li>
                                        <h4>Đại học Sư phạm Kỹ thuật Hưng Yên CS1</h4>
                                        <p>
                                            Dân Tiến, Khoái Châu, Hưng Yên
                                            <br />
                                            +0334624356
                                        </p>
                                    </li>
                                    <li>
                                        <h4>Đại học Sư phạm Kỹ thuật Hưng Yên CS2</h4>
                                        <p>
                                            Số 1 Đỗ Thế Diện, Nhân Hòa, Mỹ Hào, Hưng Yên <br />
                                            +0334624356
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('col-lg-6', 'col-md-6')}>
                            <div className={cx('contact__form')}>
                                <form action="#">
                                    <div className={cx('row')}>
                                        <div className={cx('col-lg-6')}>
                                            <input type="text" placeholder="Họ và Tên" />
                                        </div>
                                        <div className={cx('col-lg-6')}>
                                            <input type="text" placeholder="Email" />
                                        </div>
                                        <div className={cx('col-lg-12')}>
                                            <textarea placeholder="Nội Dung"></textarea>
                                            <button type="submit" className={cx('site-btn')}>
                                                Gửi Tin Nhắn
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Contact;

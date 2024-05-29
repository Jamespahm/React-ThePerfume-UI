import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './About.module.scss';

import config from '~/config/userRoutes';
import { IoChevronForwardSharp } from 'react-icons/io5';

const cx = classNames.bind(style);

function About() {
    return (
        <>
            <section className={cx('breadcrumb-option')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-12')}>
                            <div className={cx('breadcrumb__text')}>
                                <h4>Cửa Hàng</h4>
                                <div className={cx('breadcrumb__links')}>
                                    <Link to={config.home}>Trang Chủ</Link>
                                    <span className={cx('breadcrumb__links__icon')}>
                                        <IoChevronForwardSharp />
                                    </span>
                                    <span>Giới Thiệu</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={cx('about', 'spad')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-12')}>
                            <div className={cx('about__pic')}>
                                <img src={'http://localhost:8080/img/about/about-us.jpg'} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-4', 'col-md-4', 'col-sm-6')}>
                            <div className={cx('about__item')}>
                                <h4>Who We Are ?</h4>
                                <p>
                                    Contextual advertising programs sometimes have strict policies that need to be
                                    adhered too. Let’s take Google as an example.
                                </p>
                            </div>
                        </div>
                        <div className={cx('col-lg-4', 'col-md-4', 'col-sm-6')}>
                            <div className={cx('about__item')}>
                                <h4>Who We Do ?</h4>
                                <p>
                                    In this digital generation where information can be easily obtained within seconds,
                                    business cards still have retained their importance.
                                </p>
                            </div>
                        </div>
                        <div className={cx('col-lg-4', 'col-md-4', 'col-sm-6')}>
                            <div className={cx('about__item')}>
                                <h4>Why Choose Us</h4>
                                <p>
                                    A two or three storey house is the ideal way to maximise the piece of earth on which
                                    our home sits, but for older or infirm people.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx('testimonial')}>
                <div className={cx('container-fluid')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-6', 'p-0')}>
                            <div className={cx('testimonial__text')}>
                                <span className={cx('icon_quotations')}></span>
                                <p>
                                    “Going out after work? Take your butane curling iron with you to the office, heat it
                                    up, style your hair before you leave the office and you won’t have to make a trip
                                    back home.”
                                </p>
                                <div className={cx('testimonial__author')}>
                                    <div className={cx('testimonial__author__pic')}>
                                        <img src={'http://localhost:8080/img/about/testimonial-author.jpg'} alt="" />
                                    </div>
                                    <div className={cx('testimonial__author__text')}>
                                        <h5>Augusta Schultz</h5>
                                        <p>Fashion Design</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-6 p-0')}>
                            <div className={cx('testimonial__pic', 'set-bg')}>
                                <img src={'http://localhost:8080/img/about/testimonial-pic.jpg'} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={cx('counter', 'spad')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-3', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('counter__item')}>
                                <div className={cx('counter__item__number')}>
                                    <h2 className={cx('cn_num')}>102</h2>
                                </div>
                                <span>
                                    Our <br />
                                    Clients
                                </span>
                            </div>
                        </div>
                        <div className={cx('col-lg-3', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('counter__item')}>
                                <div className={cx('counter__item__number')}>
                                    <h2 className={cx('cn_num')}>30</h2>
                                </div>
                                <span>
                                    Total <br />
                                    Categories
                                </span>
                            </div>
                        </div>
                        <div className={cx('col-lg-3', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('counter__item')}>
                                <div className={cx('counter__item__number')}>
                                    <h2 className={cx('cn_num')}>102</h2>
                                </div>
                                <span>
                                    In <br />
                                    Country
                                </span>
                            </div>
                        </div>
                        <div className={cx('col-lg-3', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('counter__item')}>
                                <div className={cx('counter__item__number')}>
                                    <h2 className={cx('cn_num')}>98</h2>
                                    <strong>%</strong>
                                </div>
                                <span>
                                    Happy <br />
                                    Customer
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={cx('team', 'spad')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-12')}>
                            <div className={cx('section-title')}>
                                <span>Our Team</span>
                                <h2>Meet Our Team</h2>
                            </div>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-3', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('team__item')}>
                                <img src={'http://localhost:8080/img/about/team-1.jpg'} alt="" />
                                <h4>John Smith</h4>
                                <span>Fashion Design</span>
                            </div>
                        </div>
                        <div className={cx('col-lg-3', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('team__item')}>
                                <img src={'http://localhost:8080/img/about/team-2.jpg'} alt="" />
                                <h4>Christine Wise</h4>
                                <span>C.E.O</span>
                            </div>
                        </div>
                        <div className={cx('col-lg-3', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('team__item')}>
                                <img src={'http://localhost:8080/img/about/team-3.jpg'} alt="" />
                                <h4>Sean Robbins</h4>
                                <span>Manager</span>
                            </div>
                        </div>
                        <div className={cx('col-lg-3', 'col-md-6', 'col-sm-6')}>
                            <div className={cx('team__item')}>
                                <img src={'http://localhost:8080/img/about/team-4.jpg'} alt="" />
                                <h4>Lucy Myers</h4>
                                <span>Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={cx('clients', 'spad')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-12')}>
                            <div className={cx('section-title')}>
                                <span>Partner</span>
                                <h2>Happy Clients</h2>
                            </div>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-3', 'col-md-4', 'col-sm-4', 'col-6')}>
                            <Link to="#" className={cx('client__item')}>
                                <img src={'http://localhost:8080/img/clients/client-1.png'} alt="" />
                            </Link>
                        </div>
                        <div className={cx('col-lg-3', 'col-md-4', 'col-sm-4', 'col-6')}>
                            <Link to="#" className={cx('client__item')}>
                                <img src={'http://localhost:8080/img/clients/client-2.png'} alt="" />
                            </Link>
                        </div>
                        <div className={cx('col-lg-3', 'col-md-4', 'col-sm-4', 'col-6')}>
                            <Link to="#" className={cx('client__item')}>
                                <img src={'http://localhost:8080/img/clients/client-3.png'} alt="" />
                            </Link>
                        </div>
                        <div className={cx('col-lg-3', 'col-md-4', 'col-sm-4', 'col-6')}>
                            <Link to="#" className={cx('client__item')}>
                                <img src={'http://localhost:8080/img/clients/client-4.png'} alt="" />
                            </Link>
                        </div>
                        <div className={cx('col-lg-3', 'col-md-4', 'col-sm-4', 'col-6')}>
                            <Link to="#" className={cx('client__item')}>
                                <img src={'http://localhost:8080/img/clients/client-5.png'} alt="" />
                            </Link>
                        </div>
                        <div className={cx('col-lg-3', 'col-md-4', 'col-sm-4', 'col-6')}>
                            <Link to="#" className={cx('client__item')}>
                                <img src={'http://localhost:8080/img/clients/client-6.png'} alt="" />
                            </Link>
                        </div>
                        <div className={cx('col-lg-3', 'col-md-4', 'col-sm-4', 'col-6')}>
                            <Link to="#" className={cx('client__item')}>
                                <img src={'http://localhost:8080/img/clients/client-7.png'} alt="" />
                            </Link>
                        </div>
                        <div className={cx('col-lg-3', 'col-md-4', 'col-sm-4', 'col-6')}>
                            <Link to="#" className={cx('client__item')}>
                                <img src={'http://localhost:8080/img/clients/client-8.png'} alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;

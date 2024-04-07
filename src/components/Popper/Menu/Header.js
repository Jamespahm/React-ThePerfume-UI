import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './Menu.module.scss';
import { IoChevronBack } from 'react-icons/io5';

const cx = classNames.bind(style);

function Header({ title, onBack }) {
    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <IoChevronBack />
            </button>
            <h4 className={cx('header-title')}>{title}</h4>
        </header>
    );
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default Header;

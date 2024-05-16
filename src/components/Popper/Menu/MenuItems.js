import PropTypes from 'prop-types';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import style from './Menu.module.scss';

const cx = classNames.bind(style);

function MenuItem({ data, onLanguage }) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });

    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onLanguage}>
            {data.title}
        </Button>
    );
}

MenuItem.propTypes = {
    data: PropTypes.shape({
        icon: PropTypes.element,
        title: PropTypes.string.isRequired,
        separate: PropTypes.bool,
        to: PropTypes.string,
        onLogout: PropTypes.func, // Thêm propTypes cho onLogout
    }).isRequired,
    onLanguage: PropTypes.func,
};

export default MenuItem;

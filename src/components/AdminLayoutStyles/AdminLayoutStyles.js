import PropTypes from 'prop-types';
import './AdminLayoutStyles.scss';

function AdminLayoutStyles({ children }) {
    return children;
}
AdminLayoutStyles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayoutStyles;

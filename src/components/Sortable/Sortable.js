import React from 'react';
import { Link } from 'react-router-dom';

import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

const Sortable = ({ field, sort, onSort }) => {
    const sortType = field === sort.column ? sort.type : 'default';

    const icons = {
        default: <FaSort />,
        asc: <FaSortUp />,
        desc: <FaSortDown />,
    };
    const types = {
        default: 'asc',
        asc: 'desc',
        desc: 'default',
    };
    const icon = icons[sortType];
    const type = types[sortType];

    const handleSort = () => {
        if (type === 'default') {
            onSort({ column: field, type: 'asc' });
        } else {
            onSort({ column: field, type });
        }
    };

    return (
        <Link to="#" onClick={handleSort} className="icon-sort">
            {icon}
        </Link>
    );
};

export default Sortable;

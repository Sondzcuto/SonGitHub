import React from 'react';
import PropTypes from 'prop-types';

Sort.propTypes = {
    onShowSort: PropTypes.object
};

function Sort(props) {

    const { onShowSort } = props;
    var sortBy = onShowSort.sortBy;
    var sortValue = onShowSort.sortValue;

    const onHandleSort = (sortBy, sortValue) => {
        var onSort = {
            sortBy: sortBy,
            sortValue: sortValue
        };
        props.onHandleSort(onSort);
    }

    return (
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Sắp Xếp <span className="fa fa-caret-square-o-down ml-10"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li onClick={() => onHandleSort('name', 1)}>
                    <a role="button" className={(sortBy === 'name' && sortValue === 1) ? "sort_selected" : ""}>
                        <span className="fa fa-sort-alpha-asc pr-5">
                            Tên A-Z
                        </span>
                    </a>
                </li>
                <li onClick={() => onHandleSort('name', -1)}>
                    <a role="button" className={(sortBy === 'name' && sortValue === -1) ? "sort_selected" : ""}>
                        <span className="fa fa-sort-alpha-desc pr-5">
                            Tên Z-A
                        </span>
                    </a>
                </li>
                <li role="separator" className="divider"></li>
                <li onClick={() => onHandleSort('status', 1)}>
                    <a role="button" className={(sortBy === 'status' && sortValue === 1) ? "sort_selected" : ""}>
                        Trạng Thái Kích Hoạt</a></li>
                <li onClick={() => onHandleSort('status', -1)}>
                    <a role="button" className={(sortBy === 'status' && sortValue === -1) ? "sort_selected" : ""}>
                        Trạng Thái Ẩn</a></li>
            </ul>
        </div>
    );
}

export default Sort;
import React from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import Sort from './Sort';

Control.propTypes = {

};

function Control(props) {
    const { onHandleSearch, onHandleSort, sortBy, sortValue } = props;
    return (
        <div class="row mt-20">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Search onHandleSearch={onHandleSearch} />
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Sort onHandleSort={onHandleSort} sortBy={sortBy} sortValue={sortValue} />
            </div>
        </div>
    );
}

export default Control;
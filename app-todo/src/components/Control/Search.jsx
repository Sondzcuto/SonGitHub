import React, { useState } from 'react';
import PropTypes from 'prop-types';

Search.propTypes = {

};

function Search(props) {
    const [keyword, setKeyword] = useState('');

    const onSearch = (event) => {
        setKeyword(event.target.value);
    }

    const onHandleSearch = (event) => {
        props.onHandleSearch(keyword);
    }

    return (
        <div className="input-group" >
            <input type="text" className="form-control" placeholder="Nhập từ khóa..." name="keyword" onChange={onSearch} />
            <span className="input-group-btn">
                <button className="btn btn-primary" type="submit" onClick={onHandleSearch}>
                    <span className="fa fa-search mr-10"></span>Tìm
                </button>
            </span>
        </div>
    );
}

export default Search;
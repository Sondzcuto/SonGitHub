import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onChangeSearch = (event) => {
        if (event) {
            var target = event.target;
            var name = target.name;
            var value = target.value;
            this.setState({
                [name]: value
            })
        }
    }

    onSubmitSearch = () => {
        this.props.onSearch(this.state.keyword);
    }

    render() {
        return (
            <div className="input-group" >
                <input type="text" className="form-control" placeholder="Nhập từ khóa..." name="keyword" onChange={this.onChangeSearch} />
                <span className="input-group-btn">
                    <button className="btn btn-primary" type="submit" onClick={this.onSubmitSearch}>
                        <span className="fa fa-search mr-10"></span>Tìm
                    </button>
                </span>
            </div>
        )
    }
}

export default Search
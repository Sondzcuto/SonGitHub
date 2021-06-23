import React from 'react';

class Taskform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name: '',
            status: true
        }
    }

    componentDidMount() {
        if (this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.task && nextProps.task !== null) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            })
        } else if (nextProps.task === null) {
            this.setState({
                id : '',
                name : '',
                status: true,
            })
        }
    }

    onCloseForm = () => {
        return this.props.onCloseForm();
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmitForm(this.state);
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        } else {
            var value = target.value;
        }
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div class="panel panel-warning">
                <div class="panel-heading">
                    <h3 class="panel-title">{this.state.id === '' ? 'Thêm Công Việc' : 'Cập nhật Công Việc'}
                        <span className="fa fa-times-circle text-right ml-10" onClick={this.onCloseForm}></span>
                    </h3>
                </div>
                <div class="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <label>Tên :</label>
                            <input type="text" class="form-control" name="name" onChange={this.onChange} value={this.state.name}/>
                        </div>
                        <label>Trạng Thái :</label>
                        <select class="form-control" required="required" name="status" onChange={this.onChange} value={this.state.status}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div class="text-center">
                            <button type="submit" class="btn btn-warning">Thêm</button>&nbsp;
                            <button type="reset" class="btn btn-danger">Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Taskform
import React from 'react';

class TaskItem extends React.Component {
    onConvertStatus = () => {
        this.props.onConvertStatus(this.props.index);
    }

    onDelete = () => {
        this.props.onDelete(this.props.index);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }

    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td>{index}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span className={task.status === true ? "label label-success pointer" : "label label-danger pointer"} onClick={this.onConvertStatus}>
                        {task.status === true ? "Kích hoạt" : "Ẩn"}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
                        <span className="fa fa-pencil mr-10"></span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                        <span className="fa fa-trash mr-10"></span>Xóa
                    </button>
                </td>
            </tr>
        )
    }
}

export default TaskItem
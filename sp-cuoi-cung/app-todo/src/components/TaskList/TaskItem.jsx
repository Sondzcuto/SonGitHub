import React from 'react';
import PropTypes from 'prop-types';

TaskItem.propTypes = {
    task: PropTypes.object
};

function TaskItem(props) {
    const { task, index } = props;

    const onDelete = (param) => {
        props.onDelete(param);
    }

    const onUpdateStatus = (param) => {
        props.onUpdateStatus(param);
    }

    const onEditTask = (param) => {
        props.onEditTask(param);
    }

    return (
        <tr>
            <td>{index}</td>
            <td>{task.name}</td>
            <td className="text-center">
                <span className={task.status === true ? 'btn btn-success' : 'btn btn-danger'} onClick={() => onUpdateStatus(task.id)}>
                    {task.status === true ? 'Kích hoạt' : 'Ẩn'}
                </span>
            </td>
            <td className="text-center">
                <button type="button" className="btn btn-warning" onClick={() => onEditTask(task.id)}>
                    <span className="fa fa-pencil mr-10"></span>Sửa
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={() => onDelete(task.id)}>
                    <span className="fa fa-trash mr-10" ></span>Xóa
                </button>
            </td>
        </tr>
    );
}

export default TaskItem;
import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

TaskList.propTypes = {
    tasks: PropTypes.array
};

function TaskList(props) {
    const { tasks, onDelete, onUpdateStatus, onEditTask } = props;

    const onFilter = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        props.onFilter(
            name === 'filterName' ? value : '',
            name === 'filterStatus' ? value : -1
        );
    }

    return (
        <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input type="text"
                            className="form-control"
                            name="filterName"
                            onChange={onFilter}
                        />
                    </td>
                    <td>
                        <select className="form-control"
                            name="filterStatus"
                            onChange={onFilter}
                        >
                            <option value={-1}>Tất Cả</option>
                            <option value={2}>Ẩn</option>
                            <option value={1}>Kích Hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                {tasks.map((task, index) => {
                    return <TaskItem
                        key={index}
                        index={index}
                        task={task}
                        onDelete={onDelete}
                        onUpdateStatus={onUpdateStatus}
                        onEditTask={onEditTask}
                    />
                })}
            </tbody>
        </table>
    );
}

export default TaskList;
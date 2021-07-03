import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

TaskForm.propTypes = {
    taskEdit: PropTypes.object
};

TaskForm.defaultProps = {
    taskEdit: {
        id: '',
        name: '',
        status: true
    }
}

function TaskForm(props) {
    const { taskEdit } = props;

    const [userValue, setUserValue] = useState({
        id: '',
        name: '',
        status: true
    });

    useEffect(() => {
        console.log('SetUserValue!');
        setUserValue(taskEdit);
        return () => {
            setUserValue({});
        }
    }, [taskEdit]);

    const onCloseForm = () => {
        setUserValue(
            {
                id: '',
                name: '',
                status: true
            }
        )
        props.onCloseForm();
    }

    const onChange = (e) => {
        setUserValue({ ...userValue, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(userValue);
        props.onSubmit(userValue);
    }

    const onCancel = () => {
        setUserValue(
            {
                id: '',
                name: '',
                status: true
            }
        )
    }

    return (
        <div class="panel panel-warning">
            <div class="panel-heading">
                <h3 class="panel-title">{(userValue.id === undefined || userValue.id === '') ? 'Thêm Công Việc' : 'Edit Công Việc'}
                    <span className="fa fa-times-circle text-right ml-10"
                        onClick={onCloseForm} ></span>
                </h3>
            </div>
            <div class="panel-body">
                <form onSubmit={onSubmit}>
                    <div class="form-group">
                        <label>Tên :</label>
                        <input type="text" class="form-control" name="name" onChange={onChange} value={userValue.name} />
                    </div>
                    <label>Trạng Thái :</label>
                    <select class="form-control" required="required" name="status" onChange={onChange} value={userValue.status}>
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br />
                    <div class="text-center">
                        <button type="submit" class="btn btn-warning">Thêm</button>&nbsp;
                        <button type="reset" class="btn btn-danger" onClick={onCancel}>Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;
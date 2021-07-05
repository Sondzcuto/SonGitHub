import React, { useState, useEffect } from 'react';
import './App.scss';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskForm/TaskForm';
import Control from './components/Control/Control';


function App() {
  const [task, setTask] = useState([]);
  const [isDisplay, setIsDisplay] = useState(false);
  const [taskEdit, setTaskEdit] = useState({});
  const [filterResult, setFilterResult] = useState(
    {
      filterName: '',
      filterStatus: -1
    }
  );
  const [sortResult, setSortResult] = useState({
    sortBy: '',
    sortValue: 1
  });

  useEffect(() => {
    if (filterResult.filterName === '' &&
      filterResult.filterStatus === -1 &&
      sortResult.sortBy === '') {
      if (localStorage && localStorage.getItem('tasks')) {
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        setTask(tasks);
      }
    } else {
      var filterNameResult = FilterName(filterResult.filterName);
      var filterStatusResult = FilterStatus(filterResult.filterStatus);
      var filterResultArr = [];
      if (filterNameResult.length < filterStatusResult.length) {
        filterResultArr = filterNameResult;
      } else if (filterNameResult.length === filterStatusResult.length) {
        filterResultArr = filterNameResult;
      } else if (filterNameResult.length > filterStatusResult.length) {
        filterResultArr = filterStatusResult;
      }
      setTask(filterResultArr);
    }
  }, [filterResult]);

  useEffect(() => {
    setFilterResult({
      filterName: '',
      filterStatus: -1
    });
    if (sortResult.sortName !== '') {
      let tasks = [...task];
      let result;
      let sortBy = sortResult.sortBy;
      let sortValue = sortResult.sortValue;
      if (sortBy === 'name') {
        result = tasks.sort((a, b) => {
          if (a.name > b.name) {
            return sortValue;
          } else if (a.name < b.name) {
            return -sortValue;
          } else {
            return 0;
          }
        });
      } else {
        result = tasks.sort((a, b) => {
          if (a.status > b.status) {
            return -sortValue;
          } else if (a.status < b.status) {
            return sortValue;
          } else {
            return 0;
          }
        });
      }
      setTask(result);
    }
  }, [sortResult]);

  const onGenerateData = () => {
    var tasks = [
      {
        id: generateID(),
        name: 'Hoc lap trinh',
        status: true
      },
      {
        id: generateID(),
        name: 'Di boi',
        status: false
      },
      {
        id: generateID(),
        name: 'Ngu',
        status: true
      },
    ];
    setTask(tasks);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
  }

  const generateID = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4();
  }

  const onToggleForm = () => {
    setIsDisplay(!isDisplay);
  }

  const onCloseForm = () => {
    setIsDisplay(false);
  }

  const onSubmit = (param) => {
    var newTask = [...task];
    if (param.id === undefined || param.id === '') {
      param.id = generateID();
      if (param.status === 'false') {
        param.status = false;
      } else {
        param.status = true;
      }
      newTask.push(param);
    } else {
      var index = findIndex(param.id);

      newTask.splice(index, 1, param);
    }
    setTask(newTask);
    localStorage.setItem('tasks', JSON.stringify(newTask));
  }

  const onDelete = (param) => {
    let newTask = [...task];
    let index = findIndex(param);
    if (index > -1) {
      newTask.splice(index, 1);
    }
    setTask(newTask);
    localStorage.setItem('tasks', JSON.stringify(newTask));
  }

  const onUpdateStatus = (param) => {
    let newTask = [...task];
    let index = findIndex(param);
    if (index > -1) {
      newTask[index].status = !newTask[index].status;
    }
    setTask(newTask);
    localStorage.setItem('tasks', JSON.stringify(newTask));
  }

  const onEditTask = (param) => {
    console.log(param);
    setFilterResult({
      filterName: '',
      filterStatus: -1
    });
    if (filterResult.filterName === '' &&
      filterResult.filterStatus === -1) {
      let newTask = [...task];
      let index = findIndex(param);
      console.log(newTask[1]);
      if (index > -1) {
        setTaskEdit(newTask[index]);
      }
      onShowForm();
    }
  }

  const onShowForm = () => {
    setIsDisplay(true);
  }

  const findIndex = (param) => {
    let newTask = [...task];
    let result = -1;
    newTask.map((task, index) => {
      if (task.id === param) {
        result = index;
      }
    });
    return result;
  }

  const FilterName = (filterName) => {
    var tasks = [...task];
    var result = tasks.filter((task) => {
      var name = (task.name).toLowerCase();
      return name.indexOf(filterName) !== -1;
    });
    return result;
  }

  const FilterStatus = (filterStatus) => {
    var tasks = [...task];
    var result = [];
    if (filterStatus === -1) {
      result = tasks;
    } else {
      result = tasks.filter((task) => {
        return filterStatus === 2 ? task.status === false : task.status === true;
      })
    }
    return result;
  }

  const onFilter = (param) => {
    if (param.filterName !== undefined) {
      setFilterResult({
        filterName: param.filterName,
        filterStatus: -1
      });
    } else if (param.filterStatus !== undefined) {
      const status = parseInt(param.filterStatus, 10);
      setFilterResult({
        filterName: '',
        filterStatus: status
      });
    }
  }

  const onHandleSort = (param) => {
    setSortResult(param);
  }

  const onHandleSearch = (keyword) => {
    onFilter({
      filterName: keyword,
      filterStatus: 1
    });
  }

  return (
    <div className="container">
      <div className="text-center">
        <h1>Quản Lý Công Việc</h1>
        <hr />
      </div>
      <div className="row">
        <div className={isDisplay === true ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : "hideDisplay"}>
          <TaskForm onSubmit={onSubmit}
            onCloseForm={onCloseForm}
            taskEdit={taskEdit} />
        </div>
        <div className={isDisplay === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
          <button type="button" className="btn btn-primary mr-10" onClick={onToggleForm}>
            <span className="fa fa-plus mr-5 mr-10"></span>Thêm Công Việc
          </button>
          <button type="button"
            className="btn btn-danger" onClick={onGenerateData}>
            Generate Data
          </button>
          <Control onHandleSearch={onHandleSearch}
            onHandleSort={onHandleSort} onShowSort={sortResult} />
          <div className="row mt-20">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <TaskList tasks={task}
                onDelete={onDelete}
                onUpdateStatus={onUpdateStatus}
                onEditTask={onEditTask}
                onFilter={onFilter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import "./index.css";
import Taskform from './components/Taskform';
import Tasklist from './components/Tasklist';
import Control from './components/Control';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditting: null,
      keyword: '',
      filterName: '',
      filterStatus: -1,
      sortBy: 'name',
      sortValue: 1
    }
  }

  componentDidMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
  }

  generateID() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
  }

  onToggleForm = () => {
    if (this.state.taskEditting && this.state.taskEditting !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditting: null
      })
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditting: null
      })
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    })
  }

  onSubmitForm = (param) => {
    var { tasks } = this.state;
    if (param.id === "") {
      param['id'] = this.generateID();
      tasks.push(param);
    } else {
      var index = this.findIndex(param.id);
      tasks[index] = param;
    }
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onConvertStatus = (index) => {
    var { tasks } = this.state;
    tasks[index].status = !tasks[index].status;
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onDelete = (index) => {
    var { tasks } = this.state;
    tasks.splice(index, 1);
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdate = (id) => {
    var { tasks, taskEditting } = this.state;
    var index = this.findIndex(id);
    var taskEditting = tasks[index];
    if (index !== -1) {
      this.setState({
        taskEditting: taskEditting
      })
    }
    this.onShowForm();
  }

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }

  onSearch = (param) => {
    this.setState({
      keyword : param
    })
  }

  onFilter = (filterName, filterStatus) => {
    var filterStatus = parseInt(filterStatus,10);
    this.setState({
      filterName : filterName,
      filterStatus : filterStatus
    })
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    });
  }

  render() {
    var { tasks, isDisplayForm, taskEditting, keyword, filterName, filterStatus, sortBy, sortValue } = this.state;

    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      })
    } 

    if(filterName) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(filterName) !== -1;
      })
    } 
    
    tasks = tasks.filter((task) => {
      if(filterStatus === -1) {
        return task;
      } else {
        return filterStatus === 0 ? task.status === false : task.status === true;
      }
    })

    if (sortBy === 'name') {
      tasks.sort((a, b) => {
        if(a.name > b.name){
          return sortValue;
        }else if(a.name < b.name){
          return -sortValue;
        }else{
          return 0;
        }
      })
    }else{
      tasks.sort((a, b) => {
        if(a.status > b.status){
          return -sortValue;
        }else if(a.status < b.status){
          return sortValue;
        }else{
          return 0;
        }
      })
    }

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm === true ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : "hideDisplay"}>
            <Taskform onCloseForm={this.onCloseForm} onSubmitForm={this.onSubmitForm} task={taskEditting} />
          </div>
          <div className={isDisplayForm === true ?
            "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary mr-10"
              onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5 mr-10"></span>Thêm Công Việc
            </button>
            <Control onSearch={this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}/>
            <div className="row mt-20">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Tasklist tasks={tasks}
                  onConvertStatus={this.onConvertStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate} 
                  onFilter={this.onFilter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App

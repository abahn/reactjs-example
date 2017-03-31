import React, { Component } from 'react';
import request from 'request';

import Utils from './Utils';

import Task from './Task';
import TaskForm from './TaskForm';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };

    this.addTaskToList = this.addTaskToList.bind(this);
  }

  componentDidMount() {
    request(Utils.apiHost, (error, response, body) => {
      this.setState({
        tasks: JSON.parse(body).sort((a, b) => { return a.id - b.id })
      });
    });
  }

  todaysTasks() {
    return this
      .state
      .tasks
      .filter(task => {
        return new Date(task.due_to).setHours(0, 0, 0, 0) ===
               new Date().setHours(0, 0, 0, 0);
      })
      .map((task) => this.taskComponent(task));
  }

  pastDueTasks() {
    return this
      .state
      .tasks
      .filter(task => {
        return (new Date(task.due_to).setHours(0, 0, 0, 0) <
                new Date().setHours(0, 0, 0, 0) && !task.completed)
      })
      .map((task) => this.taskComponent(task));
  }

  taskComponent(task) {
    return (
      <Task
        task={task}
        key={task.id}/>
    )
  }

  addTaskToList(task) {
    this.setState((prevState, props) => {
      var newTasks = prevState.tasks.slice(0);
      newTasks.push(task);
      return { tasks: newTasks };
    });
  }

  render() {
    return (
      <div>
        <h1>Past due</h1>
        {this.pastDueTasks()}

        <h1>Today</h1>
        {this.todaysTasks()}

        <TaskForm
          onTaskCreated={this.addTaskToList}/>
      </div>
    );
  }
}

export default TaskList;

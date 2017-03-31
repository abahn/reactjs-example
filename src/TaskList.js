import React, { Component } from 'react';
import request from 'request';

import Utils from './Utils';

import Task from './Task';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    request(Utils.apiHost, (error, response, body) => {
      this.setState({
        tasks: JSON.parse(body).sort((a, b) => { return a.id - b.id })
      });
    });
  }

  listTasks() {
    return this
      .state
      .tasks
      .map((task) =>
      <Task
        task={task}
        key={task.id}/>
    );
  }

  render() {
    return (
      <div>
        <h1>Tasks</h1>
        {this.listTasks()}
      </div>
    );
  }
}

export default TaskList;

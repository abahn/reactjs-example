import React, { Component } from 'react';
import request from 'request';

import Utils from './Utils';

class TaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: ''
    };

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.createTask = this.createTask.bind(this);
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  createTask(event) {
    if (event.keyCode !== 13) { return };

    event.preventDefault();

    request({
      url: Utils.apiHost,
      method: 'POST',
      json: {
        item: {
          description: this.state.description,
          completed: false,
          due_to: Utils.dateToString()
        }
      }
    },
    (error, response, body) => {
      this.props.onTaskCreated(body);
      this.setState({ description: '' });
    });
  }

  render() {
    const description = this.state.description;

    return (
     <input
        className="form-control"
        type="text"
        placeholder="Add task"
        onKeyUp={this.createTask}
        onChange={this.handleDescriptionChange}
        value={description} />
    );
  };
}

export default TaskForm;

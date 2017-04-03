import React, { Component } from 'react';
import request from 'request';

import Utils from './Utils';

class Task extends Component {
  constructor(props) {
    super(props);

    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.remove = this.remove.bind(this);
  }
  stateClass() {
    return this.props.task.completed
      ? 'panel panel-success'
      : 'panel panel-default';
  }

  toggleCompleted() {
    request({
      url: `${Utils.apiHost}${this.props.task.id}`,
      method: 'PUT',
      json: {
        item: {
          completed: !this.props.task.completed
        }
      }
    },
    (error, response, body) => {
      this.props.onToggleCompleted(body);
    });
  }

  remove() {
    request({
      url: `${Utils.apiHost}${this.props.task.id}`,
      method: 'DELETE'
    },
    (error, respone, body) => {
      this.props.onRemoved(this.props.task);
    });
  }

  render() {
    const stateClass = this.stateClass();
    return (
      <div className={stateClass}>
        <div className="panel-heading"></div>
        <div className="panel-body">
          {this.props.task.description}
          <div className="btn-group pull-right">
            <a className="btn btn-default" onClick={this.toggleCompleted}>
              <span className="glyphicon glyphicon-ok"></span>
            </a>
            <a className="btn btn-default" onClick={this.remove}>
              <span className="glyphicon glyphicon-remove"></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Task;

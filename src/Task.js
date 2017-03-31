import React, { Component } from 'react';

class Task extends Component {
  stateClass() {
    return this.props.task.completed
      ? 'panel panel-success'
      : 'panel panel-default';
  }

  render() {
    const stateClass = this.stateClass();
    return (
      <div className={stateClass}>
        <div className="panel-heading"></div>
        <div className="panel-body">
          {this.props.task.description}
        </div>
      </div>
    );
  }
}

export default Task;

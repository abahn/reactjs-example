import React, { Component } from 'react';

class Task extends Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading"></div>
        <div className="panel-body">
          {this.props.task.description}
        </div>
      </div>
    );
  }
}

export default Task;

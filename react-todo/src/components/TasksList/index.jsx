import React, { Component } from "react";
import { connect } from "react-redux";

import Task from "../../containers/Task"

class TasksList extends Component {
  render() {
    const { tasksList } = this.props;
    const tasks = tasksList.map((task, index, arr) => (
      <Task
        key={task.id}
        taskId={task.id}
        title={task.title}
        completed={task.completed}
        project={task.project}
        order={task.order}
        topDisabled={index === 0}
        bottomDisabled={index === arr.length - 1}
      />
    ));

    return (
      <div className="tasksList">
        {tasks}
      </div>
    );
  }
}

const mapState = ({ tasks }, { projectId }) => ({
  tasksList: tasks
    .filter(task => task.project === projectId)
    .sort((a, b) => {
      if(a.order < b.order) return -1; 
      else if(a.order > b.order) return 1;
      return 0;
    })
});

export default connect(mapState)(TasksList);

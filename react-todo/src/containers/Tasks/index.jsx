import React, { Component } from "react";
import { connect } from "react-redux";

import { addTask } from "../../actions/tasks";
import TaskForm from "../../components/TaskForm";
import TasksList from "../../components/TasksList";

class Tasks extends Component {
  render() {
    const { addTask, projectId } = this.props;

    return (
      <div>
        <TaskForm
          onSubmit={addTask(projectId)}
        />

        <TasksList
          projectId={projectId}
        />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  addTask(projectId) {
    return title => {
      dispatch(addTask(projectId, title));
    };
  }
});

export default connect(null, mapDispatch)(Tasks);

import React, { Component } from "react";
import { connect } from "react-redux";

import {
  toggleTask, editTitle, changeOrder
} from "../../actions/tasks";
import TaskControlls from "./TaskControlls";
import TaskTitle from "./TaskTitle";

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editableTitle: props.title,
      isEditEnabled: false
    };
    this.onChange = this.onChange.bind(this);
    this.onTitleChanged = this.onTitleChanged.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.switchEditMode = this.switchEditMode.bind(this);
    this.onSaveTitle = this.onSaveTitle.bind(this);
    this.move = this.move.bind(this);
  }

  onChange() {
    const {
      taskId,
      toggleCompleted
    } = this.props;

    toggleCompleted(taskId);
  }

  onTitleChanged(title) {
    this.setState({
      editableTitle: title
    });
  }

  onCancelEdit() {
    const { title } = this.props;

    this.setState({
      editableTitle: title,
      isEditEnabled: false
    });
  }

  switchEditMode() {
    this.setState({
      isEditEnabled: true
    });
  }

  onSaveTitle() {
    const { saveTitle, taskId } = this.props;
    const { editableTitle } = this.state;

    this.setState({
      isEditEnabled: false
    });

    saveTitle(taskId, editableTitle);
  }

  move(direction) {
    const {
      project,
      taskId: id,
      order: oldOrder,
      changeOrder
    } = this.props;

    return () => {
      changeOrder({
        project, id, oldOrder,
        newOrder: direction === "top" ?
          oldOrder - 1 :
          oldOrder + 1
      });
    };
  }

  render() {
    const {
      completed,
      taskId,
      order,
      topDisabled,
      bottomDisabled
    } = this.props;

    const { editableTitle, isEditEnabled } = this.state;

    return (
      <div>
        <input
          type="checkbox"
          checked={completed}
          onChange={this.onChange}
        />
        <TaskTitle
          title={editableTitle}
          isEditEnabled={isEditEnabled}
          onTitleChanged={this.onTitleChanged}
        />
        <TaskControlls
          taskId={taskId}
          isEditEnabled={isEditEnabled}
          switchEditMode={this.switchEditMode}
          onCancelEdit={this.onCancelEdit}
          onSaveTitle={this.onSaveTitle}
          moveTop={this.move("top")}
          moveBottom={this.move("bottom")}
          topDisabled={topDisabled}
          bottomDisabled={bottomDisabled}
        />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  toggleCompleted(id) {
    dispatch(toggleTask(id));
  },
  saveTitle(id, title) {
    dispatch(editTitle(id, title));
  },
  changeOrder({ project, id, newOrder, oldOrder }) {
    dispatch(changeOrder({
      project, id, newOrder, oldOrder
    }));
  }
});

export default connect(null, mapDispatch)(Task);

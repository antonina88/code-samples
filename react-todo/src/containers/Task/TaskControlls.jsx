import React, { Component } from "react";
import { connect } from "react-redux";

import { RemoveIcon, Caret } from "../../components/Icons";
import {
  Edit, Save, Cancel
} from "../../components/Controlls";
import ActionButton from "../../components/Controlls/ActionButton";
import { removeTask } from "../../actions/tasks";

const caretStyle = {
  transform: "rotate(180deg)"
};

class TaskControlls extends Component {
  constructor(props) {
    super(props);
    
    this.removeTask = this.removeTask.bind(this);
  }

  removeTask() {
    const {
      taskId,
      onRemoveTask
    } = this.props;

    onRemoveTask(taskId);
  }

  render() {
    const {
      switchEditMode,
      isEditEnabled,
      onCancelEdit,
      onSaveTitle,
      moveTop,
      moveBottom,
      topDisabled,
      bottomDisabled
    } = this.props;

    const EditControlls = isEditEnabled ?
      [
        <Save
          key="save"
          onClick={onSaveTitle}
        />,
        <Cancel
          key="cancel"
          onClick={onCancelEdit}
        />
      ] :
      [
        <Edit
          onClick={switchEditMode}
          key="edit"
        />,
        <ActionButton
          key="moveTop"
          onClick={moveTop}
          isDisabled={topDisabled}
        >
          <Caret />
        </ActionButton>,
        <ActionButton
          key="moveBottom"
          onClick={moveBottom}
          isDisabled={bottomDisabled}
          style={caretStyle}
        >
          <Caret />
        </ActionButton>
      ]

    return (
      <span className="TaskControlls">
        {EditControlls}

        <button
          onClick={this.removeTask}
        >
          <RemoveIcon />
        </button>
      </span>
    );
  }
}

const mapDispatch = dispatch => ({
  onRemoveTask(id) {
    dispatch(removeTask(id));
  }
});

export default connect(null, mapDispatch)(TaskControlls);

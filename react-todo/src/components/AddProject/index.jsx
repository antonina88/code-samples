import React from "react";
import { connect } from "react-redux";

import { addProject } from "../../actions/projects";
import { editTitle, clearTitle } from "../../actions/projectTitle";

function AddProject({
  title,
  onChange,
  createProject
}) {
  return (
    <div className="appProjectForm">
      <input
        type="text"
        placeholder="Project's title"
        value={title}
        onChange={onChange}
      />
      <button
        onClick={() => { createProject(title); }}
      >
        Add new project
      </button>
    </div>
  );
}

const mapState = ({ projectTitle }) => ({
  title: projectTitle
});

const mapDispatch = dispatch => ({
  onChange(ev) {
    const { value: title } = ev.target;

    dispatch(editTitle(title));
  },
  createProject(title) {
    dispatch(addProject(title));
    dispatch(clearTitle());
  }
});

export default connect(mapState, mapDispatch)(AddProject);

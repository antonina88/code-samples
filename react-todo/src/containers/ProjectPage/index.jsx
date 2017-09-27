import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Controlls from "../../components/Controlls";
import { updateTitle, removeProject } from "../../actions/projects";
import Tasks from "../Tasks";

class ProjectPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editableTitle: props.title
    };

    this.onChange = this.onChange.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onChange(ev) {
    this.setState({
      editableTitle: ev.target.value
    });
  }

  toggleEditMode() {
    const { editMode } = this.state;

    this.setState({
      editMode: !editMode
    });
  }

  onCancel() {
    this.setState({
      editableTitle: this.props.title
    });

    this.toggleEditMode();
  }

  render() {
    const {
      title,
      projectId,
      removeProject,
      saveTitle
    } = this.props;

    if(projectId === null) {
      return <Redirect to="/" />
    }

    const { editMode, editableTitle } = this.state;

    const Title = editMode ?
      <input
        type="text"
        value={editableTitle}
        onChange={this.onChange}
      /> :
      <h3>{title}</h3>;

    return (
      <div className="project-item">
        <Link to="/">&lt;&lt; Home</Link>
        <div className="projectContainer">
          {Title}

          <Controlls
            editMode={editMode}
            toggleEditMode={this.toggleEditMode}
            onCancel={this.onCancel}
            saveTitle={() => {
              saveTitle(projectId, editableTitle);
            }}
            removeProject={() => {
              removeProject(projectId);
            }}
          />
        </div>

        <Tasks
          projectId={projectId}
        />
      </div>
    )
  }
}

const mapState = ({
  projects
}, { match }) => {
  const { id } = match.params;
  const projectId = Number.parseInt(id, 10);
  const project = projects.find(project => project.id === projectId);

  if(!project) return {
    projectId: null,
    title: null
  };

  return {
    projectId,
    title: project.title
  };
};

const mapDispatch = dispatch => ({
  removeProject(id) {
    dispatch(removeProject(id));
  },
  saveTitle(id, title) {
    dispatch(updateTitle(id, title));
  }
});

export default connect(mapState, mapDispatch)(ProjectPage);

import React, { Component } from "react";
import { connect } from "react-redux";

import Project from "./Project";

class ProjectsList extends Component {
  render() {
    const {
      projects
    } = this.props;

    const projectsList = projects.map(project => (
        <Project
          key={project.id}
          projectId={project.id}
          title={project.title}
        />
      )
    );

    return (
      <div className="projectsList">
        {projectsList}
      </div>
    );
  }
}

const mapState = ({ projects }) => ({ projects });

ProjectsList = connect(mapState)(ProjectsList);

export default ProjectsList;

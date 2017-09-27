import React, { Component } from "react";

import { AddIcon } from "../Icons";

export default class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
    this.onChange = this.onChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  onChange(ev) {
    this.setState({
      title: ev.target.value
    });
  }
  clearForm() {
    this.setState({
      title: ""
    });
  }

  render() {
    const { onSubmit } = this.props;
    const { title } = this.state;

    return (
      <div className="TaskForm">
        <AddIcon />
        <form
          onSubmit={ev => {
            ev.preventDefault();
            onSubmit(title);
            this.clearForm();
          }}
        >
          <input
            type="text"
            placeholder="Start typing to create a task"
            onChange={this.onChange}
            value={title}
          />
          <button>Add task</button>
        </form>
      </div>
    );
  }
}

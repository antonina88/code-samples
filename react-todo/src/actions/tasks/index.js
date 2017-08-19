export const addTask = (project, title) => ({
  type: "ADD_TASK",
  project, title
});

export const editTitle = (id, title) => ({
  type: "EDIT_TITLE",
  id, title
});

export const removeTask = id => ({
  type: "REMOVE_TASK",
  id
});

export const toggleTask = id => ({
  type: "TOGGLE_TASK",
  id
});

export const changeOrder = ({
  id, newOrder, oldOrder, project
}) => ({
  type: "CHANGE_ORDER",
  id, newOrder, oldOrder, project
});

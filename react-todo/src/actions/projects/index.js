export const addProject = title => ({
  type: "ADD_PROJECT",
  title
});

export const removeProject = id => ({
  type: "REMOVE_PROJECT",
  id
});

export const updateTitle = (id, title) => ({
  type: "UPDATE_TITLE",
  id, title
});

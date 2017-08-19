var id = 2;
const defaultState = [
  { id: 0, title: "First project" },
  { id: 1, title: "Second project" },
  { id: 2, title: "Another project" }
];

export const projects = (state = defaultState, action) => {
  const { type } = action;

  switch(type) {
    case "ADD_PROJECT":
      return addProject(state, action);
    case "REMOVE_PROJECT":
      return removeProject(state, action);
    case "UPDATE_TITLE":
      return updateTitle(state, action);
    default:
      return state;
  }
};

function addProject(state, { title }) {
  return [
    ...state.map(project => Object.assign({}, project)),
    { id: ++id, title }
  ];
}

function removeProject(state, { id }) {
  const _index = state.findIndex(project => project.id === id);

  return [
    ...state.slice(0, _index).map(project => Object.assign({}, project)),
    ...state.slice(_index + 1).map(project => Object.assign({}, project))
  ];
}

function updateTitle(state, { id, title }) {
  const _index = state.findIndex(project => project.id === id);

  return [
    ...state.slice(0, _index).map(project => Object.assign({}, project)),
    Object.assign({}, state[_index], { title }),
    ...state.slice(_index + 1).map(project => Object.assign({}, project))
  ];
}

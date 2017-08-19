const defaultState = [];
let idCounter = 0;

export const tasks = (state = defaultState, action) => {
  const { type } = action;

  switch(type) {
    case "ADD_TASK":
      return addTask(state, action);
    case "EDIT_TITLE":
      return editTitle(state, action);
    case "REMOVE_TASK":
      return removeTask(state, action);
    case "TOGGLE_TASK":
      return toggleTask(state, action);
    case "CHANGE_ORDER":
      return changeOrder(state, action);
    default:
      return state;
  }
};

function addTask(state, action) {
  const { project, title } = action;
  const order = state.filter(task => task.project === project).length;

  const task = {
    project, title,
    id: idCounter++,
    completed: false,
    order
  };

  return [ ...state, task ];
}

function editTitle(state, action) {
  const { id, title } = action;
  const taskIndex = state.findIndex(task => task.id === id);

  return [
    ...state.slice(0, taskIndex),
    Object.assign({}, state[taskIndex], { title }),
    ...state.slice(taskIndex + 1)
  ];
}

function removeTask(state, action) {
  const { id } = action;
  const taskIndex = state.findIndex(task => task.id === id);

  return [
    ...state.slice(0, taskIndex),
    ...state.slice(taskIndex + 1)
  ];
}

function toggleTask(state, action) {
  const { id } = action;
  const taskIndex = state.findIndex(task => task.id === id);
  const task = state[taskIndex];

  return [
    ...state.slice(0, taskIndex),
    Object.assign({}, task, { completed: !task.completed }),
    ...state.slice(taskIndex + 1)
  ];
}

function changeOrder(state, action) {
  const { id, newOrder, oldOrder, project } = action;

  return state.map(task => {
    if(task.project !== project)
      return task; 

    if(task.id === id)
      return Object.assign({}, task, { order: newOrder });

    if(task.order >= newOrder && task.order < oldOrder)
      return Object.assign({}, task, { order: ++task.order });

    if(task.order <= newOrder && task.order > oldOrder)
      return Object.assign({}, task, { order: --task.order });

    return task;
  });
}









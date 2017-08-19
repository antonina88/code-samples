const defaultState = "";

export const projectTitle = (state = defaultState, action) => {
  const { type } = action;

  switch(type) {
    case "EDIT_TITLE":
      return action.title;
    case "CLEAR_TITLE":
      return defaultState;
    default:
      return state;
  }
};

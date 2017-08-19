import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import { BrowserRouter } from 'react-router-dom';
import { projects } from "./reducers/projects";
import { projectTitle } from "./reducers/projectTitle";
import { tasks } from "./reducers/tasks";

const rootReducer = combineReducers({
  projects,
  projectTitle,
  tasks
});
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();

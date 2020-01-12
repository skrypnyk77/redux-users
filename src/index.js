import React, { Component } from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/index";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import AllUsers from "./components/AllUsers";

const store = createStore(rootReducer);

class App extends Component {
  render() {
    const { users } = Object.values(store.getState())[0];

    return (
      <div>
        <AllUsers users={users} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userList: state.users
  };
};

const Wrapped = connect(mapStateToProps)(App);

render(
  <Provider store={store}>
    <Wrapped />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

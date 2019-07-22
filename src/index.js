import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import RootReducer from "./redux/root-reducer";
import GridFormContainer from "./containers/GridForm/GridForm";

import "bulma/css/bulma.css";

class App extends React.Component {
  render() {
    let store = createStore(RootReducer);
    return (
      <Provider store={store}>
        <GridFormContainer />
      </Provider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

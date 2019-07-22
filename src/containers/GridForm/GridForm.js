import React from "react";
import Grid from "../Grid/Grid";
import { connect } from "react-redux";

import gridActions from "../../redux/grid/grid-actions";

import "bulma/css/bulma.css";

class GridForm extends React.Component {
  state = {
    xValue: 50,
    yValue: 50
  };

  static CellsSetup({ setX, setY, xValue, yValue, onSubmit }) {
    return (
      <React.Fragment>
        <h4>Enter the desired rows/columns values for the grid</h4>
        <br />
        <p>Min value is 50 for each</p>
        <div className="columns has-text-centered ">
          <div className="field column">
            <div className="control">
              <input
                className="input is-small"
                type="text"
                placeholder="Rows"
                value={xValue}
                onChange={setX}
              />
            </div>
          </div>
          <div className="field column">
            <div className="control">
              <input
                className="input is-small"
                type="text"
                placeholder="Columns"
                value={yValue}
                onChange={setY}
              />
            </div>
          </div>
        </div>
        <button className="button is-primary" onClick={onSubmit}>
          Create grid
        </button>
      </React.Fragment>
    );
  }

  setX = evt => {
    this.setState({
      xValue: evt.target.value
    });
  };

  setY = evt => {
    this.setState({
      yValue: evt.target.value
    });
  };

  setCells = (xValue, yValue) => {
    let cells = [];
    for (let i = 0; i < xValue; i++) {
      let row = [];
      for (let j = 0; j < yValue; j++) {
        row.push({ id: `${i}-${j}`, text: "" });
      }
      cells.push(row);
    }
    return cells;
  };

  onSubmit = () => {
    let { xValue, yValue } = this.state;
    xValue = xValue > 50 ? xValue : 50;
    yValue = yValue > 50 ? yValue : 50;
    const cells = this.setCells(xValue, yValue);
    this.props.setInitialCells(cells);
  };

  render() {
    let { CellsSetup } = GridForm;
    let { xValue, yValue } = this.state;
    let { setX, setY, onSubmit } = this;
    let content =
      this.props.cells.length < 1 ? (
        <CellsSetup
          setX={setX}
          setY={setY}
          xValue={xValue}
          yValue={yValue}
          onSubmit={onSubmit}
        />
      ) : (
        <Grid />
      );
    return (
      <section className="section">
        <div className="container">
          <div className="has-text-centered content">
            <h1 className="title">React grid showcase</h1>
            <hr />
            {content}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    cells: state.Grid.cells
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setInitialCells: cells => dispatch(gridActions.gridSetInitialCells(cells))
  };
};

const GridFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GridForm);

export default GridFormContainer;

import React from "react";
import { connect } from "react-redux";
import gridActions from "../../redux/grid/grid-actions";
import Cell from "../../components/Cell/Cell";

import "bulma/css/bulma.css";
import "./Grid.scss";

/*
 props:
 cells: array coming from redux with all the cell values from the grid
 selectedCells: array coming from redux with all the selected cell values from the grid
 currentSelectedCell: id pointing to the current selected cell
 updateSelectedCell: function that updates the current selected cells
 changeCellValue: function that updates current selected cell value
 clearCells: function that clears the text values of all the selected cells

 state:
 isEditing: variable that will be set on users double click, allowing the current selected cell to be changed

 */

class Grid extends React.Component {
  state = {};

  // sets the isEditing state variable to true on double click
  startEditingMode = () => {
    let { updateSelectedCells, currentSelectedCell } = this.props;
    updateSelectedCells(currentSelectedCell)(false);
    this.setState({
      isEditing: true
    });
  };

  // key listener that will handle cell value clearance on del and backspace press
  handleDeleteKey = e => {
    let { isEditing } = this.state;
    let { selectedCells, clearCells } = this.props;
    if (
      (e.key === "Delete" || e.key === "Backspace") &&
      (selectedCells.length > 1 || !isEditing)
    ) {
      clearCells();
    }
  };

  // function that will set the cell components with the values coming from the redux cells array with all their handlers
  // I intended to use .reduce but I was getting errors on code sandbox, so switched to.foreach
  buildGridCells = () => {
    let { isEditing } = this.state;
    let {
      currentSelectedCell,
      updateSelectedCells,
      changeCellValue,
      cells,
      selectedCells
    } = this.props;
    let rows = [];
    cells.forEach((row, rowIndex) => {
      let rowCells = [];
      row.forEach(cell => {
        let cellId = cell.id;
        let isSelected =
          selectedCells.indexOf(cellId) > -1 && selectedCells.length > 0;
        let isCurrentSelected = currentSelectedCell === cell.id;
        let onClickHandler = updateSelectedCells(cellId);
        let onChangeHandler = changeCellValue(cellId, isEditing);
        rowCells.push(
          <Cell
            key={cell.id}
            text={cell.text}
            isSelected={isSelected}
            onClickHandler={onClickHandler}
            onChangeHandler={onChangeHandler}
            isCurrentSelected={isCurrentSelected}
            isEditing={isEditing}
          />
        );
      });
      rows.push(
        <div key={`row${rowIndex}`} className="cellRow columns is-gapless">
          {rowCells}
        </div>
      );
    });
    return rows;
  };

  // sets the isEditing state variable to false when a click is done on another cell after editing mode had been started
  componentDidUpdate(prevProps) {
    if (
      prevProps.currentSelectedCell !== this.props.currentSelectedCell &&
      this.state.isEditing
    ) {
      this.setState({
        isEditing: false
      });
    }
  }

  render() {
    let { handleDeleteKey, buildGridCells, startEditingMode } = this;

    return (
      <div
        className="grid-container"
        onKeyUp={handleDeleteKey}
        onDoubleClick={startEditingMode}
      >
        <p>
          Keep shift pressed for multi-cell selection and backspace/delete to
          clear cells
        </p>
        <br />
        <p>Double-click on a cell to modify its values</p>
        {buildGridCells()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cells: state.Grid.cells,
    selectedCells: state.Grid.selectedCells,
    currentSelectedCell: state.Grid.currentSelectedCell
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSelectedCells: selectedCellID => shouldClearCells =>
      dispatch(
        gridActions.gridUpdateSelectedCells(selectedCellID, shouldClearCells)
      ),
    changeCellValue: (selectedCellID, isEditing) => value =>
      dispatch(
        gridActions.gridChangeCellValue(selectedCellID, isEditing, value)
      ),
    clearCells: () => dispatch(gridActions.gridClearSelectedCells())
  };
};

const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);

export default GridContainer;

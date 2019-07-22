const ACTIONS = {
  GRID_SET_INITIAL_CELLS: "GRID_SET_INITIAL_CELLS",
  GRID_UPDATE_SELECTED_CELLS: "GRID_UPDATE_SELECTED_CELLS",
  GRID_CLEAR_SELECTED_CELLS: "GRID_CLEAR_SELECTED_CELLS",
  GRID_CHANGE_CELL_VALUE: "GRID_CHANGE_CELL_VALUE"
};

const ACTION_CREATORS = {
  gridSetInitialCells(initialCells) {
    return {
      type: ACTIONS.GRID_SET_INITIAL_CELLS,
      payload: {
        initialCells
      }
    };
  },
  gridUpdateSelectedCells(selectedCellID, evt) {
    let shouldClearCells = true;
    if (evt.shiftKey) {
      shouldClearCells = false;
    }

    return {
      type: ACTIONS.GRID_UPDATE_SELECTED_CELLS,
      payload: {
        selectedCellID,
        shouldClearCells
      }
    };
  },
  gridClearSelectedCells() {
    return {
      type: ACTIONS.GRID_CLEAR_SELECTED_CELLS
    };
  },
  gridChangeCellValue(selectedCellID, isEditing, event) {
    if (!isEditing) {
      return;
    }
    let text = event.target.value;
    return {
      type: ACTIONS.GRID_CHANGE_CELL_VALUE,
      payload: {
        selectedCellID,
        text
      }
    };
  }
};

export default { ...ACTIONS, ...ACTION_CREATORS };

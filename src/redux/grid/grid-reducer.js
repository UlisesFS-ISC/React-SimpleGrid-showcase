import actions from "./grid-actions";

const initialState = {
  cells: [],
  selectedCells: ["0-1"]
};

const GridReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GRID_SET_INITIAL_CELLS: {
      return {
        ...state,
        cells: action.payload.initialCells
      };
    }

    case actions.GRID_CLEAR_SELECTED_CELLS: {
      let clearedCells = [...state.cells];
      state.selectedCells.forEach(selectedCell => {
        let [indexX, indexY] = selectedCell.split("-");
        let cell = clearedCells[indexX][indexY];
        cell = { ...cell, text: "" };
        clearedCells[indexX][indexY] = cell;
      });
      return { ...state, cells: clearedCells };
    }

    case actions.GRID_CHANGE_CELL_VALUE: {
      let [indexX, indexY] = state.currentSelectedCell.split("-");
      let cell = state.cells[indexX][indexY];
      let text = action.payload.text;
      cell.text = text;
      let newCells = [...state.cells];
      newCells[indexX][indexY] = cell;
      return { ...state, cells: newCells };
    }

    case actions.GRID_UPDATE_SELECTED_CELLS: {
      let selectedCellID = action.payload.selectedCellID;
      let selectedCells = !action.payload.shouldClearCells
        ? state.selectedCells
        : [];
      if (selectedCells.indexOf(selectedCellID) < 0) {
        selectedCells.push(selectedCellID);
      } else {
        selectedCells = selectedCells.filter(
          cellID => cellID !== selectedCellID
        );
      }
      return {
        ...state,
        selectedCells,
        currentSelectedCell: selectedCellID
      };
    }

    default:
      return state;
  }
};

export default GridReducer;

/*
cells: [
    [
      { id: "0-0" },
      { id: "0-1", text: "EwE" },
      { id: "0-2", text: "EwE" },
      { id: "0-3", text: "EwE" },
      { id: "0-4", text: "EwE" },
      { id: "0-5", text: "EwE" },
      { id: "0-6", text: "EwE" },
      { id: "0-7", text: "EwE" },
      { id: "0-8", text: "EwE" },
      { id: "0-9", text: "EwE" }
    ],
    [
      { id: "1-0", text: "Codingbeerse" },
      { id: "1-1", text: "de don daniel azamar" }
    ]
  ],
*/

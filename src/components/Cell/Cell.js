import React from "react";

import "bulma/css/bulma.css";
import "./Cell.scss";

/*
id: references placement on grid via  x and y index
text: contains the text value coming from redux storage
isSelected: flag indicating whether the cell is higlighted
onClickHandler: function that will dispatch an action seeking the array value to be changed
onChangeHandler: function that will dispatch an action seeking the array value to be changed
isEditing: value that indicates whether a cell is being edited
isCurrentSelected: value that indicates whether this cell is the current selection
*/
const Cell = ({
  id,
  text,
  isSelected,
  onClickHandler,
  onChangeHandler,
  isEditing,
  isCurrentSelected
}) => {
  let selectedClassName = isSelected ? "-selected" : "";
  let editableClassName = isCurrentSelected && isEditing ? "_editable" : "";
  return (
    <input
      key={id}
      type="text"
      value={text}
      onMouseDown={onClickHandler}
      onChange={onChangeHandler}
      className={`cell${selectedClassName}${editableClassName} column`}
    />
  );
};

export default Cell;

import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Task(props) {
  const { id, index, title, description } = props;

  return (
    <Draggable draggableId={id} index={index} type="Task">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task-container">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      )}
    </Draggable>
  );
}

export default Task;

import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./components/Column";
import { useState, useEffect } from "react";
import { updateTasks, getTitle } from "./taskSlice";
function App() {
  const { title } = useSelector((state) => state);
  const dispatch = useDispatch();

  let initialState = [
    {
      groupName: "ToDo",
      tasks: [
        {
          id: "1",
          title: "First",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
        {
          id: "2",
          title: "Second",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
      ],
    },
    {
      groupName: "Completed",
      tasks: [
        {
          id: "3",
          title: "Third",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
        {
          id: "4",
          title: "Fourth",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
      ],
    },
  ];

  const [taskList, setTasks] = useState(initialState);

  useEffect(() => {
    dispatch(getTitle());
  }, []);

  function onDragEnd(val) {
    const { draggableId, source, destination } = val;

    const [sourceGroup] = taskList?.filter((column) => column.groupName === source.droppableId);

    const [destinationGroup] = destination ? taskList?.filter((column) => column.groupName === destination.droppableId) : { ...sourceGroup };

    // Saves card when moved
    const [movingTask] = sourceGroup?.tasks.filter((t) => t.id === draggableId);

    const newSourceGroupTasks = sourceGroup?.tasks.splice(source.index, 1);
    const newDestinationGroupTasks = destinationGroup?.tasks.splice(destination.index, 0, movingTask);

    // Places card in a column when you drag and then drop it
    const newTaskList = taskList.map((column) => {
      if (column.groupName === source.groupName) {
        return {
          groupName: column.groupName,
          tasks: newSourceGroupTasks,
        };
      }
      if (column.groupName === destination.groupName) {
        return {
          groupName: column.groupName,
          tasks: newDestinationGroupTasks,
        };
      }
      return column;
    });
    setTasks(newTaskList);
    dispatch(updateTasks(newTaskList));
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} className="container">
      <h1 className="heading">{title}</h1>
      <div className="wrapper">
        <Column className="column" droppableId="ToDo" list={taskList[0].tasks} type="Task" />
        <Column className="column" droppableId="Completed" list={taskList[1].tasks} type="Task" />
      </div>
    </DragDropContext>
  );
}

export default App;

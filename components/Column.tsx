import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  Inprogess: " In Progress",
  done: "Done",
};

function Column({ id, todos, index }: Props) {
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {/* render droppable todos in the column */}
            <Droppable droppableId={index.toString()} type="card">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`p-2 rounded-2xl shadow-sm  ${
                    snapshot.isDraggingOver ? "bg-green-300" : "bg-white/50"
                  }`}
                >
                  <h2 className="flex justify-between font-bold text-xl p-2">
                    {idToColumnText[id]}
                    <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
                      {todos.length}
                    </span>
                  </h2>
                  <div className="space-y-2 ">
                    {todos.map((todo, index) => (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}
                      >
                        {(provided) => (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                    <div className="flex items-end justify-end p-2">
                      <button className="text-green-600 hover:text-green-700">
                        <PlusCircleIcon className="w-10 h-10"/>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default Column;

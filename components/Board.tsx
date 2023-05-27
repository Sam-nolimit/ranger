import { DragDropContext, Droppable } from "react-beautiful-dnd";

function Board() {
  return (
    <DragDropContext>
      <Droppable
        droppableId="board"
        direction="horizonatal"
        type="column"
      >
        {(provided)=>(
            <div>
                {/* render columns */}
                
            </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;

/* eslint-disable react/jsx-key */
"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

function Board() {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ]);
  // const board = useBoardStore((state) => state.board);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    
  };
  // console.log(board);
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided, snapshot) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;

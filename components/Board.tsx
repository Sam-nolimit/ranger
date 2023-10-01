/* eslint-disable react/jsx-key */
"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

function Board() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
    state.updateTodoInDB,
  ]);
  // const board = useBoardStore((state) => state.board);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // checks if the user drops outside the board
    if (!destination) return;

    // Handing column drag

    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const reArrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: reArrangedColumns,
      });
    }

    // Handle Cards drags
    // This step is need as the indexes are stored as numbers 0,1,2,3 etc, iNstead of Id's with DND Library

    const columns = Array.from(board.columns);
    const startedColumnIndex = columns[Number(source.droppableId)];
    const finishedColumnIndex = columns[Number(destination.droppableId)];

    const startColumn: Column = {
      id: startedColumnIndex[0],
      todos: startedColumnIndex[1].todos,
    };
    const finishColumn: Column = {
      id: finishedColumnIndex[0],
      todos: finishedColumnIndex[1].todos,
    };
    if (!startColumn || !finishColumn) return;
    if (source.index === destination.index && startColumn === finishColumn)
      return;

    //   creating a copy

    const newTodos = startColumn.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startColumn.id === finishColumn.id) {
      // same column but different position
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startColumn.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startColumn.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      // dragging out of the current column
      const finishTodos = Array.from(finishColumn.todos);
      finishTodos.splice(destination.index, 0, todoMoved);
      const newColumns = new Map(board.columns);
      const newCol = {
        id: startColumn.id,
        todos: newTodos,
      };

      newColumns.set(startColumn.id, newCol);
      newColumns.set(finishColumn.id, {
        id: finishColumn.id,
        todos: finishTodos,
      });

      updateTodoInDB(todoMoved,finishColumn.id);

      setBoardState({ ...board, columns: newColumns });
    }
  };

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

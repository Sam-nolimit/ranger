"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function Board() {
    const getBoard = useBoardStore((state) => state.getoard)
    useEffect(() => {
        getBoard();
    }, [])
    return (
        <h1> Hello</h1>
        // <DragDropContext>
        //   <Droppable
        //     droppableId="board"
        //     direction="horizonatal"
        //     type="column"
        //   >
        //     {(provided)=>(
        //         <div>
        //             {/* render columns */}

        //         </div>
        //     )}
        //   </Droppable>
        // </DragDropContext>
    );
}

export default Board;

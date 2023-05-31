"use client";

import getUrl from "@/lib/getUrl";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
// import { getURL } from "next/dist/shared/lib/utils";
import { useEffect, useState } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {  
        const url = await getUrl(todo.image!);
        if(url){
setImageUrl(url.toString())
        }
      };
      fetchImage;
    }
  }, [todo]);
  return (
    <>
      <div
        className="rounded-md bg-white space-y-2 drop-shadow-md "
        // onClick={()=> Modal()}
        {...draggableProps}
        {...dragHandleProps}
        ref={innerRef}
      >
        <div className="flex justify-between items-center p-5">
          <p>{todo.title}</p>
          <button
            onClick={() => deleteTask(index, todo, id)}
            className="text-red-500 hover:text-red-600"
          >
            <XCircleIcon className="ml-5 h-8 w-8" />
          </button>
        </div>
        {/* Addition of image */}
        {imageUrl && (
        <div className="relative h-full -full  rounded-b-md">
        <Image 
        src={imageUrl}
        alt='task image'
        height={200}
        width={400}
        className="w-full object-contain rounded-b-md"
        />
        </div>
        )}
      </div>
    </>
  );
}

export default TodoCard;

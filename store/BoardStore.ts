import { databases, storage } from '@/appwrite';
import { getTodoGroupedByColumn } from '@/lib/getTodoGroupedByColumn';
import { create } from 'zustand';

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
    searchString: string;
    setSearchString: (searchString: string) => void;
    newTaskInput:string;
    setNewTaskInput:(input:string)=> void;
    newTaskType:TypedColumn
    setNewTaskType:(columnId:TypedColumn)=> void;

    deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },

    searchString: '',
    newTaskInput: '',
    setSearchString: (searchString: string) => set({ searchString }),

    getBoard: async () => {
        const board = await getTodoGroupedByColumn()
        set({ board }) 
    },
    setBoardState: (board) => set({ board }),

    setNewTaskInput:(input:string) => set({newTaskInput:input}),
    newTaskType:'todo',
    setNewTaskType:(columnId:TypedColumn)=> set({ newTaskType:columnId}),

    deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
        const newColumns = new Map(get().board.columns);
        // delete todos from newcolumn

        newColumns.get(id)?.todos.splice(taskIndex, 1);
        set({ board: { columns: newColumns } });

        if (todo.image) {
            await storage.deleteFile(todo.image.bucketId, todo.image.fieldId)
        }
        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id
        );
    },

    updateTodoInDB: async (todo, columnId) => {
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id,
            {
                status: columnId,
                title: todo.title
            }
        )
    }
}))
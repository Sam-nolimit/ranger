import { ID, databases, storage } from '@/appwrite';
import { getTodoGroupedByColumn } from '@/lib/getTodoGroupedByColumn';
import uploadImage from '@/lib/uploadImage';
import { create } from 'zustand';

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
    searchString: string;
    setSearchString: (searchString: string) => void;
    newTaskInput: string;
    setNewTaskInput: (input: string) => void;
    newTaskType: TypedColumn;
    setNewTaskType: (columnId: TypedColumn) => void;
    image: File | null;
    setImage: (image: File | null) => void;
    addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;
    deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    searchString: '',
    newTaskInput: '',
    image: null,

    setSearchString: (searchString: string) => set({ searchString }),

    getBoard: async () => {
        const board = await getTodoGroupedByColumn()
        set({ board })
    },
    setBoardState: (board) => set({ board }),

    setNewTaskInput: (input: string) => set({ newTaskInput: input }),
    newTaskType: 'todo',
    setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),

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

    setImage: (image: File | null) => set({ image }),

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
    },
    addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {
        let file: Image | undefined;
        if (image) {
            const fileUploaded = await uploadImage(image);
            if (fileUploaded) {
                file = {
                    bucketId: fileUploaded.bucketId,
                    fieldId: fileUploaded.$id
                }
            }
        }
        await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            ID.unique(),
            {
                title: todo,
                status: columnId,
                ...(file && { image: JSON.stringify(file) })
            }
        );
        set({ newTaskInput: "" });

        set((state) => {
            const newColumns = new Map(state.board.columns);
            const newTodo: Todo = {
                $id: ID.unique(),
                $createdAt: new Date().toISOString(),
                title: todo,
                status: columnId,
                ...(file && { image: file })
            }

            const column = newColumns.get(columnId);
             
            if (!column) {
                newColumns.set(columnId, {
                    id: columnId,
                    todos: [newTodo],
                });
            } else {
                // column.todos.push(newTodo);
                newColumns.get(columnId)?.todos.push(newTodo);
            }
            return {
                board: {
                    columns: newColumns
                }
            }
        })
        }}
        ))
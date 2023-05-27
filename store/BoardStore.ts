// import Board from '@/components/Board';
import { create } from 'zustand';

interface BoardState {
    board: Board;
    getoard: () => void;
}

 export const useBoardStore = create<BoardState>((set) => ({
    board: {
        columns: Map<TypedColumn, Column>()
    },
    getoard: async () => {
        const board = await getTodoGroupedByColumn()
        set({board})
    }
}))
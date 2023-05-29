import { databases, storage } from '@/appwrite';
// import { getTodoGroupedByColumn } from '@/lib/getTodoGroupedByColumn';
import { create } from 'zustand';

interface ModalStore{
    isOpen: boolean;
    openModal:()=>void;
    closeModal:()=>void;
}

export const useModalStore = create<ModalStore>((set,get)=>({
    isOpen:false,
    openModal:()=>set({isOpen:true}),
    closeModal:()=>set({isOpen:false})
}));
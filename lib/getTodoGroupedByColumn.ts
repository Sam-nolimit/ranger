import { databases } from "@/appwrite"

export const getTodoGroupedByColumn = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
    );

    const todos = data.documents;

    // console.log(todos);

    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }
        acc.get(todo.status)?.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            ...(todo.image && { image: JSON.parse(todo.mage) })
        })
        return acc;
    },
        new Map<TypedColumn, Column>()
    )
    // console.log(columns);

    // If columns does not have in-progress, to-do and done, add them to an empty todos

    const columnsTypes: TypedColumn[] = ['todo', 'Inprogess', 'done'];
    // columnsTypes.forEach((columnType)=>{
    //     if(!columns.get(columnType)){
    //         columns.set(columnType,{
    //             id:columnType,
    //             todos:[]
    //         })
    //     }
    // })

    for (const columnsType of columnsTypes) {
        if (!columns.get(columnsType)) {
            columns.set(columnsType, {
                id: columnsType,
                todos: []
            })
        }
    }

    // console.log(columns)

    // sorting of columns
    const sortedColumns = new Map(
    Array.from(columns.entries()).sort((a, b) => columnsTypes.indexOf(a[0]) - columnsTypes.indexOf(b[0])))
    // console.log(sortedColumns)

    const board: Board = {
        columns: sortedColumns
    }
    return board;

}
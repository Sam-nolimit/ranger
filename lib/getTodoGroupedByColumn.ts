import { databases } from "@/appwrite"

export const getTodoGroupedByColumn = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABSE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_DATABSE_COLLECTION_ID!,
    )
    console.log(data)
}
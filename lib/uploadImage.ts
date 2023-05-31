import { ID, storage } from '@/appwrite';

const uploadImage = async (file: File) => {
    if (!file) return;

    const fileUploaded = await storage.createFile(
        '646ce8408fe19a5d76f5', ID.unique(), file);
    return fileUploaded
}
export default uploadImage;
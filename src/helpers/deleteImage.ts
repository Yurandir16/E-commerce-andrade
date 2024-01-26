import * as admin from 'firebase-admin';



async function deleteFromFirebase(fileUrl: string): Promise<void> {
    const bucket = admin.storage().bucket();
    // Extrae la ruta del archivo desde la URL.
    const matches = fileUrl.match(/o\/(.+)?\?alt=media/);
    if (!matches || matches.length < 2) {
        throw new Error("The file path could not be extracted from the URL.");
    }
    const filePath = decodeURIComponent(matches[1]);

    try {
        await bucket.file(filePath).delete();
        console.log(`File ${filePath} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting from Firebase Storage:", error);
        throw error; // Lanza el error para que pueda ser manejado por la función que llama a deleteFromFirebase.
    }
}

export default deleteFromFirebase;

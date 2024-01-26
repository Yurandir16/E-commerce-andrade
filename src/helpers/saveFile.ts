import { UploadedFile } from 'express-fileupload';
import * as admin from 'firebase-admin';

async function uploadToFirebase(file: UploadedFile, type_file: string): Promise<string> {
    const bucket = admin.storage().bucket();

    return new Promise((resolve, reject) => {
        // Genera un nombre único para el archivo basado en la fecha y el nombre original
        const uniqueName = `${Date.now()}-${file.name}`;
        const blob = bucket.file(uniqueName);

        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: type_file, // Usa el tipo de archivo proporcionado
            },
        });

        blobStream.on('error', (error) => {
            reject("Error uploading to Firebase Storage: " + error);
        });

        blobStream.on('finish', () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
            resolve(publicUrl);
        });

        blobStream.end(file.data);
    });
}

export default uploadToFirebase;
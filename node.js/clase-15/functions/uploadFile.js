import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/firebase.js';
import fs from 'fs/promises';

export async function uploadFile(file) {
    const fileRef = ref(storage, `files/${Date.now()}/${Date.now()}`);

    const fileMetadata = {
        contentType: file.mimetype
    };

    try {
        // Lee el contenido del archivo como un Buffer
        const fileBuffer = file.buffer;

        // Sube el archivo a Firebase Storage
        const uploadTask = uploadBytesResumable(fileRef, fileBuffer, fileMetadata);

        // Espera a que la tarea de carga se complete
        await uploadTask;

        // Obtiene la URL de descarga del archivo
        const fileDownloadURL = await getDownloadURL(fileRef);

        return { ref: fileRef, downloadURL: fileDownloadURL };
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        throw error;
    }
}

// import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
// import { storage } from '../firebase/firebase.js';
// import fs from 'fs/promises';

// export async function uploadFile(file) {
//     const fileRef = ref(storage, `files/${file.name} ${Date.now()}`);

//     const fileMetadata = {
//         contentType: file.type
//     };

//     try {
//         // Lee el contenido del archivo como un Buffer
//         const fileBuffer = await fs.readFile(file.path);

//         // Sube el archivo a Firebase Storage
//         await uploadBytes(fileRef, file);

//         // Obtiene la URL de descarga del archivo
//         const fileDownloadURL = await getDownloadURL(fileRef);

//         return { ref: fileRef, downloadURL: fileDownloadURL };
//     } catch (error) {
//         console.error('Error al subir el archivo:', error);
//         throw error;
//     }
// }
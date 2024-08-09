import imageCompression from 'browser-image-compression';

export async function compressImage(file) {
    try {
        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1024,
            useWebWorker: true
        }
        
        const compressedFile  = await imageCompression(file, options);

        return compressedFile;
    } catch (error) {
        console.error('Error compressing image:', error);
    }
}
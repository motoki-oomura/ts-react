export const toBlob = (file: File) => {
    return URL.createObjectURL(file);
};

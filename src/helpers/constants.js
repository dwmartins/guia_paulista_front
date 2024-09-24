const API_URL = process.env.VUE_APP_API_URL;

export const defaultLogo = new URL('@/assets/img/default/defaultLogo.png', import.meta.url).href;
export const defaultCover = new URL('@/assets/img/default/defaultCoverImage.jpg', import.meta.url).href;
export const defaultIcon = new URL('@/assets/img/default/defaultIcon.ico', import.meta.url).href;
export const defaultImg = new URL('@/assets/img/default/defaultImg.png', import.meta.url).href;
export const defaultUser = new URL('@/assets/img/default/user.jpg', import.meta.url).href;

export const systemImagesUrl = `${API_URL}/uploads/systemImages`;

import { showAlert } from "@/helpers/showAlert";
import { showText } from "@/translation";

class FileValidator {
    imgExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    fileSize = 5 * 1024 * 1024; // 5MB

    iconExtensions = ['image/vnd.microsoft.icon', 'image/x-icon', 'image/jpeg', 'image/jpg', 'image/png'];
    iconFileSize = 5 * 1024 * 1024; // 5MB

    img(image) {
        if (image.size > this.fileSize) {
            showAlert('warning', '', showText('IMG_5MB') );
            return false;
        }

        if (!this.imgExtensions.includes(image.type)) {
            showAlert('warning', '', showText('IMG_FORMAT'));
            return false;
        }

        return true;
    }

    icon(icon) {
        if (icon.size > this.iconFileSize) {
            showAlert('warning', '', showText('ICON_5MB'));
            return false;
        }
    
        if (!this.iconExtensions.includes(icon.type)) {
            showAlert('warning', 'O formato do ico deve ser um ícone ICO ou JPG, JPEG ou PNG.', );
            return false;
        }
    
        return true;
    }
}

export default new FileValidator();
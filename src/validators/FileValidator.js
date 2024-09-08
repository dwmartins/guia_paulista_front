import { showAlert } from "@/helpers/showAlert";
import { showText } from "@/translation";

class FileValidator {
    imgExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    imgSize = 5 * 1024 * 1024; // 5MB

    iconExtensions = ['image/vnd.microsoft.icon', 'image/x-icon', 'image/jpeg', 'image/jpg', 'image/png'];
    iconFileSize = 5 * 1024 * 1024; // 5MB

    img(image, size = 5) {
        if(size) {
            this.imgSize = size * 1024 * 1024;
        }  

        if (image.size > this.imgSize) {
            showAlert('warning', '', showText('IMG_MAX_SIZE').replace('{size}', size));
            return false;
        }

        if (!this.imgExtensions.includes(image.type)) {
            showAlert('warning', '', showText('IMG_FORMAT'));
            return false;
        }

        return true;
    }

    icon(icon, size = 5) {
        if(size){
            this.iconFileSize = size * 1024 * 1024;
        }

        if (icon.size > this.iconFileSize) {
            showAlert('warning', '', showText('ICON_MAX_SIZE').replace('{size}', size));
            return false;
        }
    
        if (!this.iconExtensions.includes(icon.type)) {
            showAlert('warning', '', showText('ICON_FORMAT') );
            return false;
        }
    
        return true;
    }
}

export default new FileValidator();
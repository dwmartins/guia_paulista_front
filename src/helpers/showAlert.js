import { ElNotification } from 'element-plus'

export function showAlert (type, title, message) {
    ElNotification({
        type: type,
        title: title,
        message: message
    });
}
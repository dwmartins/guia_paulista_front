import { settingsStore } from "@/store/SettingsStore";
import moment from "moment";

export function simpleDate(date) {
    const formatString = settingsStore.getSetting('dateFormat') || 'DD-MM-YYYY';
    const inputFormat = 'YYYY-MM-DD';
    const parsedDate = moment(date, inputFormat, true);

    if (parsedDate.isValid()) {
        const normalizedFormatString = formatString.replace(/-/g, '/');
        return parsedDate.format(normalizedFormatString);
    } else {
        return date;
    }
}

export function getDateAsString(date) {
    const language = settingsStore.getSetting('language') || "pt-br";

    const data = new Date(date);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return data.toLocaleDateString(language, options);
}
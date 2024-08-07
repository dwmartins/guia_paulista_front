import { reactive } from 'vue';

export const settingsStore = reactive({
    settings: [],

    setSettings(data) {
        this.settings = data; 
    },

    getSetting(name) {
        const setting = this.settings.find(setting => setting.name === name);
        return setting ? setting.value : null;
    },

    getAll() {
        return this.settings;
    }
})

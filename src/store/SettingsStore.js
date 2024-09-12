import { reactive } from 'vue';

export const settingsStore = reactive({
    settings: [],
    maintenance: 'off',

    setSettings(data) {
        this.settings = data;
        this.maintenance = this.settings.find(setting => setting.name === 'maintenance').value;
    },

    getSetting(name) {
        const setting = this.settings.find(setting => setting.name === name);
        return setting ? setting.value : null;
    },

    updateSetting(name, newValue) {
        const setting = this.settings.find(setting => setting.name === name);
        if(setting) {
            setting.value = newValue;
        }
    },

    getAll() {
        return this.settings;
    }
})

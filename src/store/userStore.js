import { reactive } from "vue";

export const userStore = reactive({
    userLogged: false,

    user: {
        id: null,
        name: "",
        lastName: "",
        email: "",
        password: "",
        token: "",
        active: "",
        role: "",
        description: "",
        phone: "",
        dateOfBirth: "",
        address: "",
        city: "",
        zipCode: "",
        state: "",
        photo: "",
        acceptsEmails: "",
        publishContactInfo: "",
        createdAt: "",
        updatedAt: "",
        permissions: {
            users: "",
            content: "",
            siteInfo: "",
            emailSending: "",
        }
    },

    updateUserLogged(data) {
        if (data.permissions) {
            this.user.permissions = { ...this.user.permissions, ...data.permissions };
        }
        this.user = { ...this.user, ...data };
        this.userLogged = true;
    },

    clean() {
        this.userLogged = false;
        
        for (let key in this.user) {
            if (typeof this.user[key] === 'object') {
                for (let subKey in this.user[key]) {
                    this.user[key][subKey] = "";
                }
            } else {
                this.user[key] = "";
            }
        }
    }
});

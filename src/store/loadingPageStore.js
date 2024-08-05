import { reactive } from "vue";

export const loadingPageStore = reactive({
    props: {
        message: '',
        showAlert: false
    },

    show(message = null) {
        this.props.message = message;
        this.props.showAlert = true;
    },

    hide() {
        this.props.message = '';
        this.props.showAlert = false;
    }
})
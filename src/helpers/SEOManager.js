import { siteInfoStore } from "@/store/siteInfoStore";

class SEOManager {
    API_URL;

    constructor() {
        this.API_URL = process.env.VUE_APP_API_URL;
    }

    setAllMeta() {
        this.setIcon();
        this.setTitle();
        this.setDescription();
        this.setKeywords();
        this.setAuthor();
    }

    setIcon() {
        if(siteInfoStore.constants.ico) {
            let link = document.createElement('link');
            link.setAttribute('rel', 'icon');
            link.setAttribute('href', `${this.API_URL}/uploads/systemImages/${siteInfoStore.constants.ico}`);
            document.head.appendChild(link);
        }
    }

    setTitle(title = "") {

        if(title) {
            document.title = title;
            return;
        }

        if(siteInfoStore.constants.webSiteName) {
            document.title = siteInfoStore.constants.webSiteName;
            return;
        }
    }

    setDescription(description = "") {
        const metaName = 'description';
        const descriptionContent = description || siteInfoStore.constants.description;

        if(descriptionContent) {
            let metaTag = document.createElement('meta');
            metaTag.setAttribute('name', metaName);
            metaTag.setAttribute('content', descriptionContent);
            document.head.appendChild(metaTag);
        }
    }

    setKeywords(keywords = "") {
        const metaName = 'keywords';
        const keywordsContent = keywords || siteInfoStore.constants.keywords;

        if(keywordsContent) {
            let metaTag = document.createElement('meta');
            metaTag.setAttribute('name', metaName);
            metaTag.setAttribute('content', keywordsContent);
            document.head.appendChild(metaTag);
        }
    }

    setAuthor() {
        let metaTag = document.createElement('meta');
        metaTag.setAttribute('name', 'author');
        metaTag.setAttribute('content', 'Dwmcode Desenvolvimento de sites e otimizações - www.dwmcode.com');
        document.head.appendChild(metaTag); 
    }
}

export default new SEOManager();
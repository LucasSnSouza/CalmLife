import { defineStore } from "pinia";

export const useSystemStore = defineStore('system', {
    state: () => ({
        premium: '',
        enabled_resources: [],
        avaliable_resources: [
            { name: 'splash_screen.interest.tips.notes' },
            { name: 'splash_screen.interest.tips.market' },
            { name: 'splash_screen.interest.tips.environment' }
        ],
        theme: '',
        language: {label: "English", value: "en"},
        languages: [
            { label: "Portugues", value: "pt" },
            { label: "English", value: "en" },
        ],
        themes: [
            "",
            "dark"
        ],
        sidebar: false,
        logged: true,
    }),
    getters: {
        getAvaliableRersources: (state) => state.avaliable_resources,
        getEnabledRersources: (state) => state.enabled_resources,
        getPremium: (state) => state.premium,
        getTheme: (state) => state.theme,
        getCurrentLanguage: (state) => state.language,
        getLanguages: (state) => state.languages,
        getThemes: (state) => state.themes,
        getSidebar: (state) => state.sidebar,
        getLogged: (state) => state.logged
    },
    actions: {
        setEnabledResources(resources_list){
            this.enabled_resources = resources_list
        },
        setLanguage(language){
            this.language = language;
        },
        setTheme(theme){
            this.theme = theme;
        },
        toggleLanguage() {
            let langIndex = this.languages.findIndex(lang => lang.value === this.language.value);
            if (langIndex >= this.languages.length - 1) {
                this.language = this.languages[0];
                return;
            }
            this.language = this.languages[langIndex + 1];
        },
        toggleTheme(){
            let theme_index = this.themes.findIndex(theme => theme == this.theme)
            if(theme_index >= this.themes.length - 1){
                this.theme = this.themes[0];
                return;
            }
            this.theme = this.themes[theme_index + 1];
        },
        toggleSidebar(value=false){
            if(value){
                this.sidebar = value
                return;
            }
            this.sidebar = !this.sidebar
        },
        toggleLoggedState(value=false){
            if(value){
                this.logged = value
                return;
            }
            this.logged = !this.logged
        }
    }
})
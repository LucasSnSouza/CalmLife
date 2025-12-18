import { defineStore } from "pinia";

import { Storage } from "@/utils/storage.js"

export const useSystemStore = defineStore('system', {
    state: () => ({
        premium: '',
        enabled_resources: [],
        avaliable_resources: [
            { name: "splash_screen.interest.tips.notes", color: "#7e54a5ff", path: "/notes" },
            { name: "splash_screen.interest.tips.market", color: "#8db847ff", path: "/market" },
            { name: "splash_screen.interest.tips.environment", color: "#4c82e6ff", path: "/environment" }
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
            Storage.get('app-system').set("resources", resources_list).save()
        },
        setLanguage(language){
            this.language = language;
            Storage.get('app-system').set("language", language).save()
        },
        setTheme(theme){
            this.theme = theme;
            Storage.get('app-system').set("theme", theme).save()
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
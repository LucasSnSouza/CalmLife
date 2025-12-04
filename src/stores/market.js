import { defineStore } from "pinia";
import { Howl } from "howler"

export const useMarketStore = defineStore('market', {
    state: () => ({
        items_list: []
    }),
    getters: {
        getItemsList: (state) => state.items_list
    },
    actions: {
        addItem(item){
            this.items_list.push(item)
        }
    }
})
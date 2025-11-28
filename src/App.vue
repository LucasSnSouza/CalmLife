<template>

    <div 
        class="app bg-color-brand-one color-brand-two w-full h-full flex flex-column relative hidden"
        :class="getTheme"
    >
        <div class="app-title p-xlg">
            <div class="flex y-end gap-md">
                <img
                    style="height: 40px;" 
                    src="/public/images/lotus_icon.png"
                />
                <h1 class="font-lg">{{ $route.meta?.title }}</h1>
            </div>
        </div>
        <div class="app-information p-xlg h-full hidden" style="padding-bottom: 0px;">
            <RouterView/>
        </div>
        <div
            class="app-navigation absolute w-full flex x-center y-center gap-lg"
            style="bottom: 0px; left: 0px; backdrop-filter: blur(var(--scale-brand-lg));"
        >
            <ButtonBasic
                v-for="(item, index) in list_navigation_buttons"
                class="flex bg-none x-center y-center flex-column p-lg rounded-md"
                :class="{'o-half': !item.selected}, {'bg-color-brand-three': item.selected}"
                :index="index"
                @click="setNavigationSelected(index), $router.push({ path: item.route })"
            >
                <div>
                    <MiscIcon
                        v-if="item.selected"
                        :icon="item?.active_icon"
                        class="bg-color-brand-two"
                        :size="[24,24]"
                    />
                    <MiscIcon
                        v-else
                        :icon="item?.inactive_icon"
                        class="bg-color-brand-two"
                        :size="[24,24]"
                    />
                </div>
                <p 
                    v-if="!item.selected"
                    class="text-center color-brand-two"
                >{{ item?.title }}</p>
            </ButtonBasic>
        </div>

        <SidePanelEnvironment
            v-if="getEnvironmentShow"
        />

        <ModalBasic
            v-if="getFavoriteEnvironmentShow"
            title="Criar Favorito"
            cancel-button="Cancelar"
            confirm-button="Criar"
            @cancel-action="toggleFavoriteEnvironmentInterface"
            @confirm-action="setFavorite"
        >
            <div class="flex flex-column gap-lg">
                <div class="flex flex-column gap-sm">
                    <p class="font-md o-half">Favorite essa lista para que você possa facilmente recarregar a momento.</p>
                </div>
                <InputBasic
                    v-model="favorite_text"
                    class="rounded-md p-lg"
                    style="
                        border: 1px solid var(--color-brand-three);
                        box-shadow: 2px 2px 8px #00000011;
                    "
                    placeholder="Que nome deseja dar a sua lista?"
                    :value="favorite_text"
                ></InputBasic>
            </div>
        </ModalBasic>

    </div>

</template>

<script>

import { RouterLink, RouterView } from 'vue-router'

import { useSystemStore } from '@/stores/system.js'
import { useEnvironmentStore } from '@/stores/environment.js'

import { Storage } from "@/utils/storage.js"

import * as Misc from "@/components/Misc"
import * as SidePanel from "@/components/SidePanel"
import * as Button from "@/components/Button"
import * as Modal from "@/components/Modal"
import * as Input from "@/components/Input"

export default {
    data(){
        return{
            list_navigation_buttons: [
                {
                    title: "Home",
                    route: "/",
                    inactive_icon: "home",
                    active_icon: "home-fill",
                    selected: true
                },
                {
                    title: "Ambientes",
                    route: "/environment",
                    inactive_icon: "music",
                    active_icon: "music-fill",
                    selected: false
                },
                {
                    title: "Mercado",
                    route: "/market",
                    inactive_icon: "cart",
                    active_icon: "cart-fill",
                    selected: false
                },
            ],
            favorite_text: ""
        }
    },
    components: {
        ...Misc,
        ...Button,
        ...SidePanel,
        ...Modal,
        ...Input
    },
    methods: {
        setNavigationSelected(selectedIndex){
            this.list_navigation_buttons = this.list_navigation_buttons.map((button, index) => ({
            ...button,
            selected: index === selectedIndex
            }))
        },
        toggleFavoriteEnvironmentInterface(){
            useEnvironmentStore().toggleFavoriteEnvironmentInterface()
        },
        toggleTheme(){
            useSystemStore().toggleTheme()
        },
        setFavorite(){
            const EnvironmentSoundsSanitized = useEnvironmentStore().getEnvironmentSounds.map(s => {
                const { howl, ...rest } = s;
                return rest;
            });
            Storage
            .get("app-favorites")
            .push("items", {
                    name: this.favorite_text,
                    items: EnvironmentSoundsSanitized
                })
            .save()
            this.toggleFavoriteEnvironmentInterface()
        },
    },
    computed: {
        getEnvironmentShow(){
            return useEnvironmentStore().getEnvironmentShow
        },
        getFavoriteEnvironmentShow(){
            return useEnvironmentStore().getFavoriteEnvironmentShow
        },
        getTheme(){
            return useSystemStore().getTheme
        }
    },
    created(){
        if(!Storage.exists("app-favorites")){
            Storage.create("app-favorites").set("items", []).save()
        }
        if(!Storage.exists("app-notes")){
            Storage.create("app-notes").set("items", []).save()
        }
        if(!Storage.exists("app-market")){
            Storage.create("app-market").set("items", []).save()
        }
    }
}

</script>

<style lang="scss">

body{
    #app{
        background: var(--color-brand-four);
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

@media screen and (min-width: 500px) {
    .app{
        width: 500px;
        height: 90%;
        border-radius: var(--scale-brand-xlg);
        box-shadow: 2px 2px 8px #00000011;
    }    
}

.app-title{
    padding-bottom: 0px;
}

.app-information{
    height: 100%;
}

.app-navigation{
    padding: 0px var(--scale-brand-xlg) 0px var(--scale-brand-xlg);
}

</style>

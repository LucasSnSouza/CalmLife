<template>

    <div class="wrapper-app bg-color-brand-one h-full flex flex-column">
        <div class="app-title p-xlg">
            <div class="flex y-center gap-md">
                <img
                    style="width: 50px;" 
                    src="/public/images/lotus_icon.png"
                />
                <h1 class="font-lg">{{ $route.meta?.title }}</h1>
            </div>
        </div>
        <div class="app-information p-xlg">
            <RouterView/>
        </div>
        <div
            class="app-navigation flex x-center y-center gap-lg"
        >
            <ButtonBasic
                v-for="(item, index) in list_navigation_buttons"
                class="flex bg-none x-center y-center flex-column p-lg rounded-md"
                :class="{'o-half': !item.selected}, {'bg-color-brand-three': item.selected}"
                :index="index"
                @click="set_navigation_selected(index), $router.push({ path: item.route })"
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
                    class="text-center"
                >{{ item?.title }}</p>
            </ButtonBasic>
        </div>

        <SidePanelEnvironment
            v-if="getEnvironmentShow"
        />

    </div>

</template>

<script>

import { RouterLink, RouterView } from 'vue-router'

import { useSystemStore } from '@/stores/system.js'
import { useEnvironmentStore } from '@/stores/environment.js'

import * as Misc from "@/components/Misc"
import * as SidePanel from "@/components/SidePanel"
import * as Button from "@/components/Button"

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
            ]
        }
    },
    components: {
        ...Misc,
        ...Button,
        ...SidePanel
    },
    methods: {
        set_navigation_selected(selectedIndex){
            this.list_navigation_buttons = this.list_navigation_buttons.map((button, index) => ({
            ...button,
            selected: index === selectedIndex
            }))
        }
    },
    computed: {
        getEnvironmentShow(){
            return useEnvironmentStore().getEnvironmentShow
        }
    },
    created(){
    }
}

</script>

<style lang="scss">

.app-title{
    padding-bottom: 0px;
}

.app-information{
    height: 100%;
}

.app-navigation{
    padding: 0px var(--scale-brand-xlg) var(--scale-brand-lg) var(--scale-brand-xlg);
}

</style>

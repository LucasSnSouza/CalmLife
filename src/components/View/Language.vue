<template>

    <div class="subview-theme flex flex-column h-full gap-lg">

        <div class="flex gap-md y-center">
            <div class="p-lg bg-color-brand-four rounded">
                <MiscIcon
                    class="bg-color-brand-two"
                    icon="translate-filled-icon"
                    :size="[20,20]"
                />
            </div>
            <h1 class="font-md">{{ $tr("splash_screen.language.title") }}</h1>
        </div>

        <div class="">
            <p class="font-md o-half">{{ $tr("splash_screen.language.description") }}</p>
        </div>

        <div class="flex warp gap-md">
            <ButtonBasic
                v-for="(item, index) in getLanguageList"
                class="flex y-center rounded-lg p-md gap-lg color-brand-two"
                :class="getCurrentLanguage.label === item.label ? 'bg-color-brand-three' : 'bg-color-brand-four'"
                style="height: 56px; padding-right: 16px;"
                :index="index"
                @click="setLanguage(item)"
            >
                <div class="p-lg h-full aspect-ratio rounded bg-color-brand-five flex y-center x-center">
                    <h1 class="font-md">{{ item.label.charAt(0).toUpperCase() }}</h1>
                </div>
                <p class="font-sm">{{ item.label }}</p>
            </ButtonBasic>
        </div>

    </div>

</template>

<script>

import { useSystemStore } from '@/stores/system.js'

import * as Misc from "@/components/Misc"
import * as Button from "@/components/Button"

export default{
    name: "sub-view-theme",
    data(){
        return{

        }
    },
    components:{
        ...Misc,
        ...Button
    },
    computed: {
        getLanguageList(){
            return useSystemStore().getLanguages
        },
        getCurrentLanguage(){
            return useSystemStore().getCurrentLanguage
        }
    },
    methods: {
        setLanguage(language){
            useSystemStore().setLanguage(language)
        }
    }
}

</script>

<style lang="scss">

</style>
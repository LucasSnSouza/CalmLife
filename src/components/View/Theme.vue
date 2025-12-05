<template>

    <div class="subview-theme flex flex-column h-full gap-lg">

        <div class="flex gap-md y-center">
            <div class="p-lg bg-color-brand-four rounded">
                <MiscIcon
                    class="bg-color-brand-two"
                    icon="lamp-filled-icon"
                    :size="[20,20]"
                />
            </div>
            <h1 class="font-md">{{ $tr("splash_screen.theme.title") }}</h1>
        </div>

        <div class="">
            <p class="font-md o-half">{{ $tr("splash_screen.theme.description") }}</p>
        </div>

        <div class="flex gap-lg scroll-x">

            <img 
                src="/arts/illustration_theme_white.png"
                class="w-3-4"
                @click="setTheme('white')"
            />
            <img 
                src="/arts/illustration_theme_dark.png"
                class="w-3-4"
                @click="setTheme('dark')"
            />

        </div>

    </div>

</template>

<script>

import { useSystemStore } from '@/stores/system.js'

import * as Misc from "@/components/Misc"

export default{
    name: "sub-view-theme",
    data(){
        return{

        }
    },
    components:{
        ...Misc
    },
    methods:{
        setTheme(theme){
            useSystemStore().setTheme(theme)
        }
    }
}

</script>

<style lang="scss">

</style>
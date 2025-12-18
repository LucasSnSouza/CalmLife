<template>

    <div 
        class="wrapper-splash-screen color-brand-two h-full font-sm flex flex-column gap-lg"
        style="padding-bottom: var(--scale-brand-xlg);"
    >

        <ViewLanguage
            v-if="page == 0"
        />

        <ViewTheme
            v-if="page == 1"
        />

        <ViewInterest
            v-if="page == 2"
            @action="enabled_resources"
        />

        <div class="flex w-full p-lg" style="padding-bottom: 0px;">
            <div class="w-full flex y-center gap-md">
                <div 
                    v-for="(item, index) in list_pages"
                    class="h-1-4 bg-color-brand-five p-sm rounded"
                    style="box-sizing: 2px 2px 8px #00000011; transition: 0.5s;"
                    :style="{
                        width: page === index ? '48px' : '',
                        background: page === index ? 'var(--color-brand-four)': ''
                    }"
                    :index="index"
                    @click="page = index"
                >
                </div>
            </div>
            <div class="p-lg bg-color-brand-four rounded">
                <MiscIcon
                    class="bg-color-brand-two"
                    icon="arrow"
                    :size="[20,20]"
                    @click="page++"
                />
            </div>
        </div>
    </div>

</template>

<script>

import { useSystemStore } from '@/stores/system.js'

import { Storage } from "@/utils/storage.js"

import * as Misc from "@/components/Misc"
import * as Button from "@/components/Button"
import * as View from "@/components/View"

export default{
    data(){
        return{
            page: 0,
            list_pages: [
                0,
                1,
                2
            ],
            enabled_resources: []
        }
    },
    components: {
        ...Misc,
        ...Button,
        ...View
    },
    watch: {
        page(value){
            if(value > this.list_pages.length - 1){
                useSystemStore().setEnabledResources(Storage.get("app-system").data.resources)
                this.$router.push({ path: '/home' })
            }
        }
    },
    computed: {
        
    },
    created(){
        if(Storage.exists("app-system")){
            const AppSystemStorage = Storage.get("app-system").data
            if(AppSystemStorage.resources.length > 0){
                this.$router.push({ path: "/home" })
            }
        }
    }
}

</script>

<style lang="scss">
</style>
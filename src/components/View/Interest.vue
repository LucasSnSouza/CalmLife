<template>

    <div class="subview-theme flex flex-column h-full gap-lg">

        <div class="flex gap-md y-center">
            <div class="p-lg bg-color-brand-four rounded">
                <MiscIcon
                    class="bg-color-brand-two"
                    icon="like"
                    :size="[20,20]"
                />
            </div>
            <h1 class="font-md">{{ $tr("splash_screen.interest.title") }}</h1>
        </div>

        <div class="">
            <p class="font-md o-half">{{ $tr("splash_screen.interest.description") }}</p>
        </div>

        <div class="flex warp gap-md">
            <ButtonBasic
                v-for="(item, index) in getAvaliableResources"
                class="flex y-center rounded-lg p-lg gap-lg"
                :class="isEnabled(item) ? 'bg-color-brand-three color-brand-one' : 'bg-color-brand-four color-brand-two'"
                :index="index"
            >
                <label >
                    <input type="checkbox" hidden v-model="enabled_resources" :value="item"/>
                    <p class="font-sm">{{ $tr(item.name) }}</p>
                </label>
            </ButtonBasic>
        </div>

    </div>

</template>

<script>

import { useSystemStore } from '@/stores/system.js'

import * as Button from "@/components/Button"
import * as Misc from "@/components/Misc"

export default{
    name: "sub-view-theme",
    data(){
        return{
            enabled_resources: []
        }
    },
    components:{
        ...Misc,
        ...Button
    },
    computed: {
        getAvaliableResources(){
            return useSystemStore().getAvaliableRersources
        }
    },
    methods: {
        isEnabled(item) {
            return this.enabled_resources.some(res =>
                res.name.toLowerCase() === item.name.toLowerCase()
            );
        }
    }
}

</script>

<style lang="scss">

</style>
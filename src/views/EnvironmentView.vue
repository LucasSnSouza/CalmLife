<template>

    <div class="wrapper-environment color-brand-two h-full font-sm flex flex-column gap-md">

        <h1 class="font-md">Sons Ambientes</h1>
        <p class="w-3-4">
            Faça do seu dispositivo um gerador de sons ambientes confortaveis para todas as horas.
        </p>

        <div class="flex gap-md">
            <ButtonBasic
                class="rounded-lg p-md bg-color-brand-four"
                @click="toggleEnvironmentInterface()"
            >
                <div class="bg-color-brand-five rounded p-md">
                    <MiscIcon
                        class="bg-color-brand-two"
                        icon="music-fill"
                        :size="[20,20]"
                    />
                </div>
            </ButtonBasic>
            <ButtonBasic
                class="rounded-lg p-md bg-color-brand-four"
                @click="toggleFavoriteEnvironmentInterface()"
            >
                <div class="bg-color-brand-five rounded p-md">
                    <MiscIcon
                        class="bg-color-brand-two"
                        icon="favorite"
                        :size="[20,20]"
                    />
                </div>
            </ButtonBasic>
        </div>

        <div class="flex flex-column gap-md scroll-y" style="height: 75%; padding-bottom: 60px;">

            <!-- <AdsenseRetangle ad-slot="4058977152"/> -->

            <SoundBasic
                v-for="(item, index) in getEnvironmentSounds"
                :title="item.title"
                :description="item?.description"
                :photo="item.photo"
                @change="(event) => { setVolume(index, event.target.value) }"
                @pause="togglePause(index)"
                :index="index"
            >
            </SoundBasic>

        </div>

    </div>

</template>

<script>

import { useEnvironmentStore } from '@/stores/environment.js'

import * as Misc from "@/components/Misc"
import * as Button from "@/components/Button"
import * as Sound from "@/components/Sound"
import * as AdSense from "@/components/Adsense"

export default {
    data(){
        return{
        }
    },
    components: {
        ...Misc,
        ...Button,
        ...Sound,
        ...AdSense
    },
    methods: {
        toggleEnvironmentInterface(){
            useEnvironmentStore().toggleEnvironmentInterface()
        },
        toggleFavoriteEnvironmentInterface(){
            useEnvironmentStore().toggleFavoriteEnvironmentInterface()
        },
        setVolume(index, volume){
            useEnvironmentStore().setVolume(index, volume)
        },
        togglePause(index){
            useEnvironmentStore().togglePause(index)
        }
    },
    computed: {
        getEnvironmentSounds(){
            return useEnvironmentStore().getEnvironmentSounds
        }
    },
    created(){
    }
}

</script>

<style lang="scss">

.panel-information{

    height: calc( 100% - 48px );

}

</style>

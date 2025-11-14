<template>

    <div class="wrapper-homeview h-full font-sm flex flex-column gap-md">

        <h1 class="font-md">Sons Ambientes</h1>
        <p class="w-3-4">
            Faça do seu dispositivo um gerador de sons ambientes confortaveis para todas as horas.
        </p>

        <div>
            <ButtonBasic
                class="rounded-md p-lg bg-color-brand-three"
                @click="toggleEnvironmentInterface()"
            >
                <MiscIcon
                    class="bg-color-brand-one"
                    icon="music-fill"
                    :size="[20,20]"
                />
            </ButtonBasic>
        </div>

        <MiscDivision/>

        <div class="flex flex-column gap-md">

            <SoundBasic
                v-for="(item, index) in getEnvironmentSounds"
                :title="item.title"
                @change="(event) => { setVolume(index, event.target.value) }"
                @pause="togglePause(index)"
                :index="index"
            >
            </SoundBasic>

        </div>

        <div class="flex x-center">
            <MiscIcon
                class="bg-color-brand-three"
                icon="dots-fill"
                :size="[24,24]"
            />
        </div>

    </div>

</template>

<script>

import { useEnvironmentStore } from '@/stores/environment.js'

import * as Misc from "@/components/Misc"
import * as Button from "@/components/Button"
import * as Sound from "@/components/Sound"

export default {
    data(){
        return{
        }
    },
    components: {
        ...Misc,
        ...Button,
        ...Sound,
    },
    methods: {
        toggleEnvironmentInterface(){
            useEnvironmentStore().toggleEnvironmentInterface()
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

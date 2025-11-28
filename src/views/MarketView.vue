<template>

    <div class="wrapper-homeview color-brand-two h-full font-sm flex flex-column gap-md">

        <h1 class="font-md">Lista de Compras</h1>
        <p class="w-3-4">
            Faça suas listas de compras, compare preços e economize seu dinheiro.
        </p>

        <div class="flex gap-lg">
            <ButtonBasic
                class="rounded-lg bg-color-brand-four w-half aspect-ratio color-brand-one p-lg flex flex-column gap-sm justify-between"
                @click=""
            >
                <div class="flex">
                    <div class="color-brand-two ghost rounded-md p-md">
                        <MiscIcon
                            icon="box-fill"
                            class="bg-color-brand-two"
                            :size="[20,20]"
                        />
                    </div>
                </div>
                <div class="color-brand-two text-start">
                    <h1 class="font-md">Adicionar Item</h1>
                    <p class="font-sm">Insira mais um item na lista</p>
                </div>
            </ButtonBasic>
            <div
                class="w-half flex flex-column gap-md"
            >
                <ButtonBasic
                    class="rounded-lg bg-color-brand-four w-full h-full color-brand-one p-lg flex gap-md"
                    @click=""
                >
                    <div class="color-brand-two text-start flex flex-column y-start x-center">
                        <h1 class="font-md">Guardar Lista</h1>
                        <p class="font-sm">Salve essa lista para comparação</p>
                    </div>
                </ButtonBasic>
                <ButtonBasic
                    class="rounded-lg bg-color-brand-four w-full h-full color-brand-one p-lg flex gap-md"
                    @click=""
                >
                    <div class="color-brand-two text-start flex flex-column y-start x-center">
                        <h1 class="font-md">Limpar Lista</h1>
                        <p class="font-sm">Volte a lista do zero</p>
                    </div>
                </ButtonBasic>
            </div>
        </div>

        <div class="flex flex-column gap-md scroll-y" style="height: 75%;">


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
